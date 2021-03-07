from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from dotenv import load_dotenv
import os
import azure.cosmos.documents as documents
import azure.cosmos.cosmos_client as cosmos_client
import azure.cosmos.exceptions as exceptions
from azure.cosmos.partition_key import PartitionKey

app = Flask(__name__)
CORS(app)
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
            partition_key=PartitionKey(path='/user_id'),
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

# container.query_items(
#     query,
#     parameters=None,
#     partition_key=None,
#     enable_cross_partition_query=None,
#     max_item_count=None,
#     enable_scan_in_query=None,
#     populate_query_metrics=None,
#     **kwargs,
# )
def get_user(std_id):
    

    return users

@app.route('/api/check-user/<str_id>', methods=["GET"])
def check_user(str_id):
    users = list(container.query_items(
        query="SELECT * FROM r WHERE r.id=@id",
        parameters=[
            { "name":"@id", "value": str_id }
        ],
        enable_cross_partition_query=True
    ))

    if len(users) > 0:
        return jsonify({
            "success": True
        })
    else:
        return jsonify({
            "succes": False
        })

@app.route('/api/get-user/<str_id>', methods=["GET"])
def get_user(str_id):
    users = list(container.query_items(
        query="SELECT * FROM r WHERE r.id=@id",
        parameters=[
            { "name":"@id", "value": str_id }
        ],
        enable_cross_partition_query=True
    ))

    return jsonify(users[0])

@app.route('/api/create-user', methods=['POST'])
def create_user():

    user_json = None
    if request.method == 'POST':
        user_json = json.loads(request.data)
    else:
        raise ValueError("NOT POST")

    print(user_json)
    str_id = user_json['id']
    users = list(container.query_items(
        query="SELECT * FROM r WHERE r.id=@id",
        parameters=[
            { "name":"@id", "value": str_id }
        ],
        enable_cross_partition_query=True
    ))
    if len(users) == 0:
        container.create_item(body=user_json)
        return (jsonify(
            {"sucess": True}
        ), 200)
    else:
        container.replace_item(item=users[0], body=user_json)
        return (jsonify(
            {"sucess": True}
        ), 200)

# No access to the database
# 
@app.route('/api/getGoFundMe', methods=["POST"])
def get_gofundme():
    print(request.data)
    json_data = json.loads(request.data)
    url = json_data["url"]


    return jsonify(
        {
            "success": True,
            "url": "here",
            "title": "Backend fjasdkfldjsalfdsaj",
            "description": "Backend description"
            # ...
        }
    )



if __name__ == "__main__":
    app.run()