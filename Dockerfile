# Use a lightweight Python image as required by tutorial
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /home/

# Install necessary packages (nginx and python dependencies)
RUN apt-get update && apt-get install -y nginx \
    && pip install flask gunicorn  # Using Flask for Python web serving

# Copy your web files
COPY . /home/web/

# Create a Flask wrapper to serve static files with STL protection
COPY <<'EOF' /home/web_server.py
from flask import Flask, send_from_directory, request, abort
import os

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('/home/web', 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    # Block direct access to STL files
    if path.endswith('.stl'):
        referer = request.headers.get('Referer', '')
        # Allow only if request comes from our own site
        if not referer or request.host not in referer:
            abort(403)  # Forbidden

    return send_from_directory('/home/web', path)
EOF

# Make the Python script executable
RUN chmod +x /home/web_server.py

# Expose port 80
EXPOSE 80

# Define the entry point for the container
ENTRYPOINT ["gunicorn", "--bind", "0.0.0.0:80", "web_server:app"]