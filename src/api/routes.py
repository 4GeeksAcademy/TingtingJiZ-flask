"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Favourites
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
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


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None).lower()
    password = data.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if not user:
        response_body['message'] = 'Authorization denied. email, password incorrect or user inactive'
        return response_body, 401
    access_token = create_access_token(identity={'email': user.email, 
                                                 'user_id': user.id, 
                                                 'is_admin': user.is_admin})
    response_body['results'] = user.serialize()
    response_body['message'] = 'User logged'
    response_body['access_token'] = access_token
    return response_body, 201


@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    email = data.get("email").lower()
    new_user = Users(
        email = data.get("email"),
        password = data.get("password"),
        is_active = True,
        is_admin = False
    )
    db.session.add(new_user)
    db.session.commit()
    user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    access_token = create_access_token(identity={'email': user.email,
                                                 'user_id': user.id,
                                                 'is_admin': user.is_admin})
    response_body['results'] = user.serialize()
    response_body['message'] = 'User Registrado y logeado'
    response_body['access_token'] = access_token
    return response_body, 201

@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    current_user = get_jwt_identity()  # Access the identity of the current user with get_jwt_identity
    # TODO: buscar en la DB los datos del usuario
    if current_user['is_admin']:
        response_body['message'] = f'Acceso concedido a {current_user["email"]}'
        response_body['results'] = current_user
        return response_body, 200
    response_body['message'] = f'Acceso dengado porque no eres Administrador'
    response_body['results'] = {}
    return response_body, 403

""" @api.route("/load-data", methods=["GET"])
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
 """
""" @api.route("/load-json", methods= ["GET"])
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
    return {}, 200 """


@api.route("/favourites", methods=["POST","GET", "DELETE"])
@jwt_required()
def favourites():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.execute(db.select(Users).where(Users.id == current_user["user_id"])).scalar()
    if not user:
        response_body["results"] = {}
        response_body["message"] = "User not found"
        return response_body, 404
    user_id = user.id
    if request.method == "POST":
       data = request.json
       item = data.get("item")
       print("here1")
       if not user:
           response_body["message"] = "Missing favourite item"
           return response_body, 400
       favourite = db.session.execute(db.select(Favourites).where(Favourites.user_id == user_id, Favourites.item == item)).scalar()
       if favourite:
            response_body["message"] = "The favourite already exists!!!"
            return jsonify(response_body), 409
       favourites = Favourites (item = item, user_id=user_id)
       db.session.add(favourites)
       db.session.commit()
       response_body["message"] = "Favourite item added seccessfully"
       print("here5")
       return response_body, 201

    if request.method == "GET":
        favourites = db.session.execute(db.select(Favourites).where(Favourites.user_id == current_user["user_id"])).scalars()
        results = [{"id": row.id, "item": row.item} for row in favourites]
        response_body["results"] = results
        response_body["message"] = f"Favourites for user {current_user}"
        return response_body, 200

    if request.method == "DELETE":
        data = request.json
        itemUser = data.get("item")
        favourite_to_delete = db.session.execute(db.select(Favourites).where(Favourites.user_id == user_id, Favourites.item == itemUser)).scalar()
        if not favourite_to_delete:
            response_body["message"] = f"Favourite item '{itemUser}' not found"
            return jsonify(response_body), 404
        db.session.delete(favourite_to_delete)
        db.session.commit()
        response_body["message"] = f"Favourite item '{itemUser}' deleted"
        return jsonify(response_body), 201