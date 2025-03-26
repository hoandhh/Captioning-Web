# services/user_service.py
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
import datetime
import re

class UserService:
    @staticmethod
    def validate_email(email):
        """Kiểm tra email hợp lệ"""
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, email):
            return False, "Email không hợp lệ"
        return True, ""
    
    @staticmethod
    def validate_password(password):
        """Kiểm tra mật khẩu mạnh"""
        # Kiểm tra độ dài tối thiểu
        if len(password) < 6:
            return False, "Mật khẩu phải có ít nhất 6 ký tự"
        
        # Kiểm tra có ít nhất 1 chữ hoa
        if not any(char.isupper() for char in password):
            return False, "Mật khẩu phải có ít nhất 1 chữ in hoa"
        
        # Kiểm tra có ít nhất 1 ký tự đặc biệt
        special_chars = "!@#$%^&*()-_=+[]{}|;:'\",.<>/?"
        if not any(char in special_chars for char in password):
            return False, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"
        
        return True, ""
    
    @staticmethod
    def create_user(username, password, email):
        """Tạo người dùng mới với mật khẩu đã được mã hóa"""
        # Kiểm tra email hợp lệ
        is_valid_email, email_error = UserService.validate_email(email)
        if not is_valid_email:
            raise ValueError(email_error)
        
        # Kiểm tra mật khẩu mạnh
        is_valid_password, password_error = UserService.validate_password(password)
        if not is_valid_password:
            raise ValueError(password_error)
        
        # Kiểm tra email đã tồn tại chưa
        if User.objects(email=email.lower()).first():
            raise ValueError("Email đã được sử dụng")
        
        # Kiểm tra username đã tồn tại chưa
        if User.objects(username=username).first():
            raise ValueError("Tên người dùng đã tồn tại")
        
        # Tạo người dùng mới
        hashed_password = generate_password_hash(password)
        user = User(
            username=username,
            password=hashed_password,
            email=email.lower()  # Lưu email dưới dạng chữ thường để tránh trùng lặp
        )
        user.save()
        return user
    
    @staticmethod
    def authenticate(username, password):
        """Xác thực người dùng bằng tên người dùng"""
        user = User.objects(username=username).first()
        if user and check_password_hash(user.password, password):
            user.last_login = datetime.datetime.now()
            user.save()
            return user
        return None
    
    @staticmethod
    def authenticate_by_email(email, password):
        """Xác thực người dùng bằng email"""
        # Kiểm tra email hợp lệ
        is_valid, error = UserService.validate_email(email)
        if not is_valid:
            return None
        
        user = User.objects(email=email.lower()).first()
        if user and check_password_hash(user.password, password):
            user.last_login = datetime.datetime.now()
            user.save()
            return user
        return None
    
    @staticmethod
    def change_password(user_id, current_password, new_password):
        """Thay đổi mật khẩu người dùng"""
        # Kiểm tra mật khẩu mới có đủ mạnh không
        is_valid, error = UserService.validate_password(new_password)
        if not is_valid:
            raise ValueError(error)
        
        user = User.objects(id=user_id).first()
        if not user:
            raise ValueError("Không tìm thấy người dùng")
            
        if not check_password_hash(user.password, current_password):
            raise ValueError("Mật khẩu hiện tại không chính xác")
            
        user.password = generate_password_hash(new_password)
        user.save()
        return True
    
    @staticmethod
    def reset_password(email):
        """Tạo token đặt lại mật khẩu và gửi email"""
        # Kiểm tra email hợp lệ
        is_valid, error = UserService.validate_email(email)
        if not is_valid:
            raise ValueError(error)
            
        # Tìm người dùng bằng email
        user = User.objects(email=email.lower()).first()
        if not user:
            return False
            
        # Trong triển khai thực tế:
        # 1. Tạo token đặt lại mật khẩu
        # 2. Lưu token vào database với thời gian hết hạn
        # 3. Gửi email với link đặt lại mật khẩu
        
        return True
    
    @staticmethod
    def update_profile(user_id, data):
        """Cập nhật thông tin hồ sơ người dùng"""
        user = User.objects(id=user_id).first()
        if not user:
            raise ValueError("Không tìm thấy người dùng")
        
        # Kiểm tra email nếu được cập nhật
        if 'email' in data:
            # Kiểm tra email hợp lệ
            is_valid, error = UserService.validate_email(data['email'])
            if not is_valid:
                raise ValueError(error)
                
            # Kiểm tra email không trùng lặp
            if data['email'].lower() != user.email:
                existing_email = User.objects(email=data['email'].lower()).first()
                if existing_email:
                    raise ValueError("Email đã được sử dụng bởi tài khoản khác")
                data['email'] = data['email'].lower()
        
        # Cập nhật các trường
        for key, value in data.items():
            if key != 'password' and key != 'role':  # Bảo vệ các trường nhạy cảm
                setattr(user, key, value)
        
        user.save()
        return user
    
    @staticmethod
    def get_user_by_id(user_id):
        """Lấy người dùng theo ID"""
        user = User.objects(id=user_id).first()
        if not user:
            raise ValueError("Không tìm thấy người dùng")
        return user
    
    @staticmethod
    def get_all_users(page=1, per_page=20):
        """Lấy tất cả người dùng với phân trang (chỉ admin)"""
        return User.objects.paginate(page=page, per_page=per_page)
    
    @staticmethod
    def delete_user(user_id):
        """Xóa người dùng (chỉ admin)"""
        user = User.objects(id=user_id).first()
        if not user:
            raise ValueError("Không tìm thấy người dùng")
            
        user.delete()
        return True
