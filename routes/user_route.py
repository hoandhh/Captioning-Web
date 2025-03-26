# routes/user_routes.py
from flask import Blueprint
from controllers.user_controller import register, login, get_profile, update_profile, change_password, forgot_password

user_routes = Blueprint('user_routes', __name__)

user_routes.route('/register', methods=['POST'])(register)
user_routes.route('/login', methods=['POST'])(login)
user_routes.route('/profile', methods=['GET'])(get_profile)
user_routes.route('/profile', methods=['PUT'])(update_profile)
user_routes.route('/password', methods=['PUT'])(change_password)
user_routes.route('/forgot-password', methods=['POST'])(forgot_password)
