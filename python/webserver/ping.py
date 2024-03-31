from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs

class PingServer(BaseHTTPRequestHandler):
    # this is the method that gets called when a GET request is made
    # and returns a simple HTML response
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b"<html><body><h1>Hey Jimmy</h1></body></html>")
        
    # this parses all the request data and returns it in a dictionary
    # in the form of {key: [value]} in <html> tags
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        form_data = parse_qs(post_data.decode('utf-8'))

        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

        response = "<html><body>"
        response += "<h1>POST Request Received</h1>"
        response += "<p>Received data:</p>"
        response += "<ul>"
        for key, value in form_data.items():
            response += f"<li>{key}: {value[0]}</li>"
        response += "</ul>"
        response += "</body></html>"

        self.wfile.write(response.encode('utf-8'))