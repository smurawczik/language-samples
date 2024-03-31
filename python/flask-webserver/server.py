from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def index():
    return '<h1>Hello, World!</h1>'

@app.route('/post', methods=['POST'])
def post_example():
    data = request.form.get('data')
    return f'Received data: {data}'

if __name__ == '__main__':
    app.run(debug=True)
