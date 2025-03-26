# services/user_service.py
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
import datetime

class UserService:
    @staticmethod
    def create_user(username, password, email):
        """Tạo người dùng mới với mật khẩu đã được mã hóa"""
        hashed_password = generate_password_hash(password)
        user = User(
            username=username,
            password=hashed_password,
            email=email
        )
        user.save()
        return user
    
    @staticmethod
    def authenticate(username, password):
        """Xác thực người dùng"""
        user = User.objects(username=username).first()
        if user and check_password_hash(user.password, password):
            user.last_login = datetime.datetime.now()
            user.save()
            return user
        return None
    
    @staticmethod
    def change_password(user_id, current_password, new_password):
        """Thay đổi mật khẩu người dùng"""
        user = User.objects(id=user_id).first()
        if user and check_password_hash(user.password, current_password):
            user.password = generate_password_hash(new_password)
            user.save()
            return True
        return False
    
    @staticmethod
    def reset_password(email):
        """Tạo token đặt lại mật khẩu và gửi email"""
        # Triển khai sẽ bao gồm tạo token và gửi email
        pass
    
    @staticmethod
    def update_profile(user_id, data):
        """Cập nhật thông tin hồ sơ người dùng"""
        user = User.objects(id=user_id).first()
        if user:
            for key, value in data.items():
                if key != 'password' and key != 'role':  # Bảo vệ các trường nhạy cảm
                    setattr(user, key, value)
            user.save()
            return user
        return None
    
    @staticmethod
    def get_user_by_id(user_id):
        """Lấy người dùng theo ID"""
        return User.objects(id=user_id).first()
    
    @staticmethod
    def get_all_users(page=1, per_page=20):
        """Lấy tất cả người dùng với phân trang (chỉ admin)"""
        return User.objects.paginate(page=page, per_page=per_page)
    
    @staticmethod
    def delete_user(user_id):
        """Xóa người dùng (chỉ admin)"""
        user = User.objects(id=user_id).first()
        if user:
            user.delete()
            return True
        return False