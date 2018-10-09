from flask import Flask, render_template
import requests
import json

app = Flask(__name__)


@app.route("/find-path")
def main():
    return 200

if __name__ == "__main__":
    app.run(host="0.0.0.0")