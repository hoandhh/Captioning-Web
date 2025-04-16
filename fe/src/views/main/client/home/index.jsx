import { useEffect } from "react";
import "../../../../styles/user/home/style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import AOS from "aos";
import "aos/dist/aos.css";

import hoangHonHoTay from "../../../../assets/images/hoanghonHoTay.jpg";
import xeLua from "../../../../assets/images/xelua.jpg";
import hoa from "../../../../assets/images/hoa.jpg";
import caulongbien from "../../../../assets/images/caulongbien.jpg";
import hamcamap from "../../../../assets/images/hamcamap.jpg";
import hoguom from "../../../../assets/images/hoguom.jpg";
import longbien from "../../../../assets/images/longbien.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const listImages = [xeLua, hoa, caulongbien, hamcamap, hoguom, longbien];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="homeClient !p-4 sm:p-6 md:p-8">
      {/* Ảnh lớn */}
      <div className="flex justify-center !mb-6 sm:mb-8" data-aos="fade-up">
        <img
          src={hoangHonHoTay}
          alt="Hoàng Hôn Hồ Tây"
          className="w-full max-w-[95%] sm:max-w-[600px] rounded-xl shadow-[0_8px_20px_rgba(122,82,33,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(122,82,33,0.5)]"
        />
      </div>

      {/* Tiêu đề */}
      <h2
        className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-[#5a3e36] !mb-4 tracking-wide"
        data-aos="fade-up"
      >
        Lắng nghe Hà Nội kể chuyện qua từng khung hình
      </h2>

      {/* Mô tả */}
      <p
        className="text-center text-base sm:text-lg text-[#3e3e3e] !mb-8 leading-relaxed italic"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Mỗi góc phố, mỗi tia nắng, mỗi làn sương sớm nơi đây
        <br />
        đều ẩn chứa một câu chuyện dịu dàng, một hồi ức không thể quên...
      </p>

      {/* Slider */}
      <div data-aos="zoom-in" data-aos-delay="400">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={4000}
          breakpoints={{
            0: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          spaceBetween={20}
          allowTouchMove={false}
        >
          {listImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-[100px] sm:h-[120px] md:h-[140px] object-cover rounded-lg shadow-[0_4px_12px_rgba(122,82,33,0.2)] transition-transform duration-300 hover:scale-105"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Nút khám phá */}
      <div
        className="flex justify-center !mt-8 sm:mt-10"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <Link
          className="text-center text-xl sm:text-2xl md:text-[2rem] font-bold text-[#5a3e36] hover:underline hover:text-[#7a5221] transition-all duration-300"
          to="/about"
        >
          Về chúng tôi
        </Link>
      </div>
    </div>
  );
};

export default Home;
