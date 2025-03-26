# services/image_caption_service.py
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import os

class ImageCaptionService:
    """
    Lớp này chịu trách nhiệm:
    - Load mô hình BLIP và Processor từ local (một lần duy nhất).
    - Cung cấp hàm generate_caption() nhận file ảnh từ controller, trả về chuỗi caption.
    """

    # Các thuộc tính "static" để giữ mô hình, processor, thiết bị
    _model = None
    _processor = None
    _device = "cuda" if torch.cuda.is_available() else "cpu"
    _model_path = "D:/AIRC/Backend-AIRC-Web/pretrain/blip_trained"
    _is_loading = False  # Ngăn chặn các nỗ lực tải đồng thời

    @classmethod
    def _load_model_if_needed(cls):
        """
        Hàm nội bộ, chỉ load model và processor một lần.
        Giúp tránh việc load mô hình nhiều lần gây chậm hệ thống.
        """
        if cls._model is None or cls._processor is None:
            if cls._is_loading:
                # Đợi nếu một luồng khác đang tải
                import time
                while cls._is_loading and (cls._model is None or cls._processor is None):
                    time.sleep(0.5)
                return
                
            cls._is_loading = True
            try:
                if not os.path.exists(cls._model_path):
                    raise FileNotFoundError(f"Không tìm thấy đường dẫn mô hình: {cls._model_path}")
                    
                print(f"Đang tải mô hình BLIP từ {cls._model_path}...")
                cls._processor = BlipProcessor.from_pretrained(cls._model_path)
                cls._model = BlipForConditionalGeneration.from_pretrained(cls._model_path)
                cls._model = cls._model.to(cls._device)
                cls._model.eval()
                print(f"Tải mô hình thành công trên thiết bị {cls._device}")
            finally:
                cls._is_loading = False

    @classmethod
    def unload_model(cls):
        """
        Giải phóng mô hình để giải phóng bộ nhớ GPU khi cần
        """
        if cls._model is not None:
            cls._model = None
            cls._processor = None
            # Bắt buộc thu gom rác
            import gc
            gc.collect()
            if cls._device == "cuda":
                torch.cuda.empty_cache()
            print("Đã giải phóng mô hình khỏi bộ nhớ")

    @classmethod
    def generate_caption_from_path(cls, image_path, max_length=30, num_beams=5):
        """
        Tạo caption cho ảnh từ đường dẫn file
        """
        if not os.path.exists(image_path):
            raise ValueError("Không tìm thấy file ảnh")
            
        try:
            # Đảm bảo model & processor đã được load
            cls._load_model_if_needed()

            # Mở file ảnh với Pillow từ đường dẫn
            image = Image.open(image_path).convert("RGB")

            # Dùng processor để tiền xử lý input
            inputs = cls._processor(image, return_tensors="pt")

            # Đưa input lên GPU (nếu khả dụng)
            for k, v in inputs.items():
                inputs[k] = v.to(cls._device)

            # Sinh output (caption)
            with torch.no_grad():
                output_ids = cls._model.generate(
                    **inputs,
                    max_length=max_length,
                    num_beams=num_beams,
                    min_length=5
                )

            # Decode thành câu
            caption = cls._processor.decode(output_ids[0], skip_special_tokens=True)
            return caption

        except IOError as e:
            # Xử lý lỗi khi tải ảnh
            print(f"Lỗi khi tải ảnh: {e}")
            raise ValueError("File ảnh không hợp lệ hoặc sai định dạng") from e
        except RuntimeError as e:
            # Xử lý lỗi CUDA hết bộ nhớ hoặc các lỗi runtime khác
            print(f"Lỗi khi chạy mô hình: {e}")
            raise RuntimeError("Không thể xử lý ảnh với mô hình") from e
        except Exception as e:
            # Bắt tất cả các lỗi không mong đợi
            print(f"Lỗi không mong đợi trong quá trình tạo chú thích: {e}")
            raise
