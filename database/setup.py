# database/setup.py
from flask_mongoengine import MongoEngine
from pymongo import MongoClient
from datetime import datetime

db = MongoEngine()

def initialize_db(app):
    db.init_app(app)
    # Thiết lập tự động migration
    setup_migrations(app)

def setup_migrations(app):
    """
    Thiết lập tự động migration cho MongoDB.
    Vì MongoDB không có schema cứng, chúng ta sẽ triển khai một hệ thống kiểm soát phiên bản đơn giản
    để theo dõi và áp dụng các thay đổi đối với cấu trúc tài liệu.
    """
    mongo_uri = app.config['MONGODB_SETTINGS']['host']
    client = MongoClient(mongo_uri)
    
    # Xác định tên cơ sở dữ liệu từ URI
    db_name = 'airc'  # Tên mặc định nếu không được chỉ định trong URI
    if '/' in mongo_uri.split('@')[-1]:
        parts = mongo_uri.split('/')
        if len(parts) > 3 and parts[3]:
            db_name = parts[3]
    
    database = client[db_name]
    
    # Kiểm tra xem collection migrations có tồn tại không
    if 'migrations' not in database.list_collection_names():
        database.create_collection('migrations')
        database.migrations.insert_one({'version': 0, 'applied_at': datetime.now()})
    
    # Áp dụng migrations nếu cần
    apply_migrations(database)

def apply_migrations(database):
    """Áp dụng bất kỳ migrations nào đang chờ xử lý"""
    current_version = database.migrations.find_one({}, sort=[('version', -1)])['version']
    # Logic migration sẽ được đặt ở đây
    # Ví dụ: Nếu current_version < 1, áp dụng migration 1, v.v.
