require 'sinatra'

# Define routes and corresponding actions
get '/' do
  'Hello, World!'
end

get '/about' do
  'This is a Sinatra web server.'
end

get '/hello/:name' do
  "Hello, #{params['name']}!"
end

# Start the server
set :bind, '0.0.0.0'  # Bind to all interfaces
set :port, 8000        # Set port to 8000

