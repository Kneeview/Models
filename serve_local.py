#!/usr/bin/env python3
"""
Local development server for KneeView with STL file protection.
This server prevents direct downloads of STL files while allowing
the application to load them via JavaScript.

Usage: python3 serve_local.py
Server will run on http://localhost:5500
"""

from flask import Flask, send_from_directory, request, abort
import os

app = Flask(__name__)

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def index():
    """Serve the main index.html page"""
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    """
    Serve static files with STL protection.

    STL files are only served if the request comes from our own site,
    preventing direct downloads via URL.
    """
    # Block direct access to STL files
    if path.endswith('.stl'):
        referer = request.headers.get('Referer', '')
        host = request.headers.get('Host', '')

        # Allow only if request comes from our own site
        if not referer or host not in referer:
            print(f"[BLOCKED] Direct STL access attempt: {path}")
            print(f"  Referer: {referer or 'None'}")
            print(f"  Host: {host}")
            abort(403)  # Forbidden

        print(f"[ALLOWED] STL loaded from application: {path}")

    return send_from_directory(BASE_DIR, path)

if __name__ == '__main__':
    print("=" * 60)
    print("KneeView Local Development Server")
    print("=" * 60)
    print("STL File Protection: ENABLED")
    print("- Direct STL downloads are blocked")
    print("- Application can still load STL files normally")
    print("=" * 60)
    print("\nServer running at: http://localhost:5500")
    print("Press Ctrl+C to stop\n")

    app.run(host='0.0.0.0', port=5500, debug=True)
