#include <iostream>
#include <string>
#include <boost/asio.hpp>

using namespace boost::asio;
using ip::tcp;

class HttpSession : public std::enable_shared_from_this<HttpSession>
{
public:
  explicit HttpSession(tcp::socket socket) : socket_(std::move(socket)) {}

  void start()
  {
    do_read();
  }

private:
  void do_read()
  {
    auto self(shared_from_this());
    socket_.async_read_some(
        boost::asio::buffer(data_, max_length),
        [this, self](boost::system::error_code ec, std::size_t length)
        {
          if (!ec)
          {
            do_write(length);
          }
        });
  }

  void do_write(std::size_t length)
  {
    auto self(shared_from_this());
    boost::asio::async_write(
        socket_, boost::asio::buffer(data_, length),
        [this, self](boost::system::error_code ec, std::size_t /*length*/)
        {
          if (!ec)
          {
            do_read();
          }
        });
  }

  tcp::socket socket_;
  enum
  {
    max_length = 1024
  };
  char data_[max_length];
};

class HttpServer
{
public:
  HttpServer(io_service &io_service, int port)
      : acceptor_(io_service, tcp::endpoint(tcp::v4(), port)),
        socket_(io_service)
  {
    do_accept();
  }

private:
  void do_accept()
  {
    acceptor_.async_accept(socket_,
                           [this](boost::system::error_code ec)
                           {
                             if (!ec)
                             {
                               std::cout << "Client connected\n";
                               std::make_shared<HttpSession>(
                                   std::move(socket_))
                                   ->start();
                             }

                             do_accept();
                           });
  }

  tcp::acceptor acceptor_;
  tcp::socket socket_;
};

int main()
{
  try
  {
    boost::asio::io_service io_service;
    HttpServer server(io_service, 8080);
    io_service.run();
  }
  catch (std::exception &e)
  {
    std::cerr << "Exception: " << e.what() << "\n";
  }

  return 0;
}
