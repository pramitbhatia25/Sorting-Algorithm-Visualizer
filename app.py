import flask
from flask import Flask, request
from flask_cors import CORS, cross_origin
import time
import requests
import os


app = Flask(__name__)

@app.route("/")
@cross_origin()
def hello():
    return flask.render_template("index.html")