from http.server import BaseHTTPRequestHandler, HTTPServer
from ping import PingServer

def run_server(port=8080):
    server_address = ('', port)
    httpd = HTTPServer(server_address, PingServer)
    print(f"Server running on port {port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
