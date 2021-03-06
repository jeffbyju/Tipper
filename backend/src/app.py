from flask import Flask, request, jsonify
import json
from dotenv import load_dotenv
import os
import pymongo

app = Flask(__name__)
load_dotenv(verbose=True)

uri = os.getenv("URI")
client = pymongo.MongoClient(uri)

@app.route('/api/')
def hello():
    return "Hello world"

@app.route('/api/create-user', methods=['POST'])
def create_user():
    if request.method == 'POST':
        print(request.data)
        # json_data = json.loads(request.data)
        # print(json_data)
        return jsonify({"status": "success"})
    else:
        raise ValueError("NOT POST")

if __name__ == "__main__":
    app.run()