"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Authors
import requests
import json


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=["GET", "POST"])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200

@api.route("/users", methods=["GET", "POST"])
def handle_users():
    response_body = {}
    if request.method == "GET":
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]  # List comprehesion
        response_body["results"] = results
        response_body["message"] = "GET request"
        return response_body, 200
    if request.method == "POST":
        response_body["message"] = "POST request"
        return response_body, 200


@api.route("/users/<int:user_id>", methods=["GET", "PUT", "DELETE"])
def handle_user(user_id):
    response_body = {}
    if request.method == "GET":
        row = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not row:
              response_body["results"] = {}
              response_body["message"] = f'doesnt exist {user_id}'
              return response_body, 404
        response_body["results"] = row.serialize()
        response_body["message"] = f'Recibi el GET request {user_id}'
        return response_body, 200
    if request.method == "PUT":
        response_body["message"] = f'Recibi el PUT request {user_id}'
        return response_body, 200
    if request.method == "DELETE":
        response_body["message"] = f'Recibi el DELETE request {user_id}'
        return response_body, 200

@api.route("/authors", methods=["GET", "POST"])
def handle_authors():
    response_body = {}
    if request.method == "GET":
        rows = db.session.execute(db.select(Authors)).scalars()
        results = [row.serialize() for row in rows]  # List comprehesion
        response_body["results"] = results
        response_body["message"] = "GET autors"
        return response_body, 200
    if request.method == "POST":
        response_body["message"] = "POST request"
        return response_body, 200

@api.route("/load-data", methods=["GET"])
def load_data_from_api():
    response_body = {}
    url = 'https://randomuser.me/api/?nat=es&results=20'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body["results"] = data["results"]
        for row in data["results"]:
            email = row["email"]
            password = row["login"]["password"]
            firstname = row["name"]["first"]
            lastname = row["name"]["last"]
            print(email, password, firstname, lastname)
            user = Users()
            user.email = email
            user.password = password
            user.firstname = firstname
            user.lastname = lastname
            user.is_active = True
            user.is_admin = False
            db.session.add(user)
            db.session.commit()
    return {}, 200

@api.route("/load.json", methods= ["GET"])
def load_json():
    with open('src/api/user.json') as json_file:
        data = json.load(json_file)
        print(data)
        for row in data:
            email = row["email"]
            password = row["password"]
            firstname = row["firstname"]
            lastname = row["lastname"]
            print(email, password, firstname, lastname)
            user = Users()
            user.email = email
            user.password = password
            user.firstname = firstname
            user.lastname = lastname
            user.is_active = row["is_active"]
            user.is_admin = row["is_admin"]
            db.session.add(user)
            db.session.commit()
    return {}, 200
