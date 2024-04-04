require 'webrick'

# Create a new server instance
server = WEBrick::HTTPServer.new(Port: 8000)

# Define a handler to respond to HTTP requests
server.mount_proc '/' do |req, res|
  res.content_type = 'text/plain'
  res.body = 'Hello, World!'
end

# Start the server
trap('INT') { server.shutdown }
server.start
