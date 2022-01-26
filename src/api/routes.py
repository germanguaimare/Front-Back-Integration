"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime

api = Blueprint('app', __name__)

@api.route('/users', methods=['GET',"POST"])
def manage_users():
    if request.method == "GET":
        all_users = User.query.all()
        all_users = list(map(lambda x: x.serialize(),all_users))
        return jsonify(all_users), 200
    else:
        body = request.get_json()
        if body is None:
            return "You must type your name, an email and password", 400
        if "email" not in body:
            return "You must type your email", 400
        if "password" not in body:
            return "You must type your password", 400  
        if "name" not in body:
            return "You must type your name", 400

        searchUsers = User.query.filter_by(email=body["email"]).first()
        
        if searchUsers is None:
            name = body['name']
            email = body['email']
            password = body['password'] 
            is_active = True 

            newUser = User()  
            newUser.name= name
            newUser.email = email
            newUser.password = password
            newUser.is_active = is_active
            db.session.add(newUser)
            db.session.commit()
            message = "A new account has been created"
            return message, 200
        else:
            message = "There's an existing user with that email"
            return message, 400
        
@api.route('/login', methods=["POST"])
def login():
    if request.method == "POST":
        body = request.get_json()
        if "email" not in body:
            return "You must type your email", 400
        if "password" not in body:
            return "You must type your password", 400 

        searchUsers = User.query.filter_by(email=body["email"]).first()
        
        if searchUsers:
            if searchUsers.password == body["password"]:
                time = datetime.timedelta(minutes=2)
                access_token = create_access_token(identity=body["email"], expires_delta=time)
                response = {
                    "email": body["email"], "token":access_token, "expires_in": time.total_seconds(), "status": "ok"
                        }
                return jsonify(response), 200
            else:
                return jsonify("Wrong email or password")
        else:
            return jsonify("Please go to the Sign In page to create your User"), 200

@api.route('/private', methods=["GET"])
@jwt_required()
def private():
    if request.method == "GET":
        token = get_jwt_identity()
        return jsonify("You accesed your private dashboard"), 200