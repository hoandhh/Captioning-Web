# routes/image_caption_routes.py
from flask import Blueprint
from controllers.image_caption_controller import upload_with_caption, update_caption, regenerate_caption

image_caption_routes = Blueprint('image_caption_routes', __name__)

# Upload ảnh và tự động tạo caption
image_caption_routes.route('/upload', methods=['POST'])(upload_with_caption)

# Cập nhật caption theo ý người dùng
image_caption_routes.route('/<image_id>/caption', methods=['PUT'])(update_caption)

# Tạo lại caption với mô hình
image_caption_routes.route('/<image_id>/regenerate', methods=['POST'])(regenerate_caption)
