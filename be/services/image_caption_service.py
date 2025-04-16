# services/image_caption_service.py
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import os
from googletrans import Translator
from gtts import gTTS
import tempfile
import playsound  

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
    # _model_path = "D:/AIRC/AIRC-Backend/pretrain/blip_trained"
    
    current_dir = os.path.dirname(os.path.abspath(__file__))  # Lấy thư mục hiện tại (services)
    parent_dir = os.path.abspath(os.path.join(current_dir, ".."))  # Lùi lên một cấp (AIRC-Backend)
    _model_path = os.path.join(parent_dir, "pretrain", "blip_trained")  # Đường dẫn đến pretrain/blip_trained
    
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
                cls._processor = BlipProcessor.from_pretrained(cls._model_path, use_fast=True)
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
    def generate_caption_from_path(cls, image_path, max_length=30, num_beams=5, speak=False):
        """
        Tạo caption cho ảnh từ đường dẫn file.
        Nếu speak=True, sẽ dịch caption sang tiếng Anh và phát tiếng.
        """
        if not os.path.exists(image_path):
            raise ValueError("Không tìm thấy file ảnh")

        try:
            cls._load_model_if_needed()
            image = Image.open(image_path).convert("RGB")
            inputs = cls._processor(image, return_tensors="pt")
            for k, v in inputs.items():
                inputs[k] = v.to(cls._device)

            with torch.no_grad():
                output_ids = cls._model.generate(
                    **inputs,
                    max_length=max_length,
                    num_beams=num_beams,
                    min_length=5
                )

            caption_vi = cls._processor.decode(output_ids[0], skip_special_tokens=True)
            print("📸 Caption tiếng Việt:", caption_vi)

            if speak:
                translator = Translator()
                translation = translator.translate(caption_vi, src='en', dest='vi')
                caption_en = translation.text
                print("🔁 Dịch sang tiếng Anh:", caption_en)

                # Chuyển văn bản tiếng Anh thành tiếng nói
                tts = gTTS(caption_en, lang='vi')
                with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as fp:
                    temp_path = fp.name
                    tts.save(temp_path)

                # Phát âm thanh
                try:
                    playsound.playsound(temp_path)
                except Exception:
                    os.system(f"start {temp_path}")  # fallback nếu playsound lỗi

                # Xóa file tạm (tuỳ chọn)
                os.remove(temp_path)

            return caption_vi

        except Exception as e:
            print(f"Lỗi khi tạo caption: {e}")
            raise
