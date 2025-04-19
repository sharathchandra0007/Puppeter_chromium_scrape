from flask import Flask, jsonify, send_file
import json
import os

app = Flask(__name__)

with open('scraped_data.json') as f:
    scraped_data = json.load(f)

@app.route('/')
def index():
    return jsonify(scraped_data)

# NEW: Serve screenshot image
@app.route('/screenshot')
def screenshot():
    if os.path.exists('screenshot.png'):
        return send_file('screenshot.png', mimetype='image/png')
    else:
        return jsonify({"error": "Screenshot not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)