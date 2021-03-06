from flask import Flask, request, jsonify
import json
from dotenv import load_dotenv
import os
import azure.cosmos.documents as documents
import azure.cosmos.cosmos_client as cosmos_client
import azure.cosmos.exceptions as exceptions
from azure.cosmos.partition_key import PartitionKey

app = Flask(__name__)
load_dotenv(verbose=True)

# uri = os.getenv("URI")

HOST = os.getenv("HOST")
MASTER_KEY = os.getenv("KEY")
DATABASE_ID = os.getenv("DATABASE_ID")
CONTAINER_ID = os.getenv("CONTAINER_ID")

def create_db():
    client = cosmos_client.CosmosClient(
        HOST,
        {'masterKey': MASTER_KEY},
        user_agent="CosmosDBDotnetQuickstart",
        user_agent_overwrite=True
    )
    try:
        db = client.create_database(id=DATABASE_ID)
    except exceptions.CosmosResourceExistsError:
        print("Database {} already exists".format(DATABASE_ID))
        db = client.get_database_client(DATABASE_ID)
    
    try:
        container = db.create_container(
            id=CONTAINER_ID,
            partition_key=PartitionKey(path='/account_number'),
            offer_throughput=400
        )
        print("Container with id \'{0}\' created".format(CONTAINER_ID))
    except exceptions.CosmosResourceExistsError:
        print('Container with id \'{0}\' was found'.format(CONTAINER_ID))
        container = db.get_container_client(CONTAINER_ID)

    return db, container

"""Create Database"""
db, container = create_db()

@app.route('/api/')
def hello():
    if container:
        return jsonify(
            {"status": "success"}
        )
    else:
        return jsonify(
            {"status": "failed"}
        )

@app.route('/api/create-user', methods=['POST'])
def create_user():
    if request.method == 'POST':
        print(request.data)
        user_json = json.loads(request.data)
        container.create_item(body=user_json)
    else:
        raise ValueError("NOT POST")

if __name__ == "__main__":
    app.run()