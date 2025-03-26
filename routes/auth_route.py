# routes/auth_routes.py
from flask import Blueprint
from controllers.user_controller import register, login

auth_routes = Blueprint('auth_routes', __name__)

auth_routes.route('/register', methods=['POST'])(register)
auth_routes.route('/login', methods=['POST'])(login)