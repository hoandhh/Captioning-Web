# controllers/user_controller.py
from flask import request, jsonify, Blueprint
from services.user_service import UserService
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User

user_controller = Blueprint('user_controller', __name__)

def register():
    data = request.get_json()
    
    # Xác thực đầu vào
    if not all(k in data for k in ('username', 'password', 'email')):
        return jsonify({'error': 'Thiếu các trường bắt buộc'}), 400
    
    # Kiểm tra xem người dùng đã tồn tại chưa
    existing_user = User.objects(username=data['username']).first()
    if existing_user:
        return jsonify({'error': 'Tên người dùng đã tồn tại'}), 409
    
    # Tạo người dùng mới
    try:
        user = UserService.create_user(
            username=data['username'],
            password=data['password'],
            email=data['email']
        )
        return jsonify({'message': 'Đăng ký người dùng thành công'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def login():
    data = request.get_json()
    
    # Xác thực đầu vào
    if not all(k in data for k in ('username', 'password')):
        return jsonify({'error': 'Thiếu tên người dùng hoặc mật khẩu'}), 400
    
    # Xác thực người dùng
    user = UserService.authenticate(data['username'], data['password'])
    if not user:
        return jsonify({'error': 'Thông tin đăng nhập không hợp lệ'}), 401
    
    # Tạo token truy cập
    access_token = create_access_token(identity=str(user.id))
    return jsonify({
        'access_token': access_token,
        'user': {
            'id': str(user.id),
            'username': user.username,
            'email': user.email,
            'role': user.role
        }
    }), 200

@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = UserService.get_user_by_id(user_id)
    
    if not user:
        return jsonify({'error': 'Không tìm thấy người dùng'}), 404
    
    return jsonify({
        'username': user.username,
        'email': user.email,
        'role': user.role,
        'created_at': user.created_at,
        'last_login': user.last_login
    }), 200

@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    updated_user = UserService.update_profile(user_id, data)
    if not updated_user:
        return jsonify({'error': 'Không thể cập nhật hồ sơ'}), 400
    
    return jsonify({'message': 'Cập nhật hồ sơ thành công'}), 200

@jwt_required()
def change_password():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not all(k in data for k in ('current_password', 'new_password')):
        return jsonify({'error': 'Thiếu các trường bắt buộc'}), 400
    
    success = UserService.change_password(
        user_id, 
        data['current_password'], 
        data['new_password']
    )
    
    if not success:
        return jsonify({'error': 'Mật khẩu hiện tại không chính xác'}), 400
    
    return jsonify({'message': 'Thay đổi mật khẩu thành công'}), 200

def forgot_password():
    data = request.get_json()
    
    if 'email' not in data:
        return jsonify({'error': 'Email là bắt buộc'}), 400
    
    # Thông thường sẽ gửi email đặt lại mật khẩu
    UserService.reset_password(data['email'])
    
    # Không tiết lộ liệu email có tồn tại hay không vì lý do bảo mật
    return jsonify({'message': 'Nếu email tồn tại, một liên kết đặt lại sẽ được gửi'}), 200
