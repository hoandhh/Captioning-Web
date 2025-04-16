import "../../../../styles/user/about/style.scss";
import React, { useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import sampleImage from "../../../../assets/images/background1.jpg";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="about relative bg-[#fdfaf4] text-[#4a3d35] overflow-hidden"
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10">
        {/* Section 1: Về chúng tôi (ảnh bên phải) */}
        <section className="min-h-screen flex flex-col justify-center !px-6 !py-16 bg-[#fcf7ee]">
          <div
            className="w-full grid md:grid-cols-2 gap-10 items-center mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Nội dung bên trái */}
            <div
              className="text-left space-y-4"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <h1 className="text-3xl font-bold text-[#5e463a] !mb-4">
                Về Chúng Tôi
              </h1>
              <p className="text-lg leading-relaxed italic text-[#4a3d35]">
                "Một lần dạo bước ở Hà Nội, bạn chụp được khoảnh khắc tuyệt đẹp
                nhưng lại chẳng nhớ đó là con phố nào, góc quán nào. Trang web
                này được tạo ra để giúp bạn kết nối lại với những ký ức ấy,
                thông qua từng khung hình."
              </p>
            </div>

            {/* Ảnh bên phải */}
            <img
              src={sampleImage}
              alt="Ảnh mẫu"
              className="w-full rounded-xl shadow-xl border border-[#d6c9b8]"
              data-aos="zoom-in"
              data-aos-delay="400"
            />
          </div>
        </section>

        {/* Section 2: Câu chuyện phía sau (Ảnh bên trái) */}
        <section className="min-h-screen flex flex-col justify-center !px-6 !py-16 bg-[#fcf7ee]">
          <div
            className="w-full grid md:grid-cols-2 gap-10 items-center mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Ảnh bên trái */}
            <img
              src={sampleImage}
              alt="Câu chuyện phía sau"
              className="w-full rounded-xl shadow-xl border border-[#d6c9b8]"
              data-aos="zoom-in"
              data-aos-delay="300"
            />

            {/* Nội dung bên phải */}
            <div
              className="text-left space-y-4"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <h2 className="text-2xl font-semibold text-[#5a3e36]">
                Câu chuyện phía sau
              </h2>
              <p className="text-base leading-loose text-[#4a3d35]">
                Những tấm ảnh cũ thường chất chứa cảm xúc, nhưng đôi khi ta lại
                quên mất địa điểm chụp. Dự án này ra đời để kết nối công nghệ
                nhận diện hình ảnh với trải nghiệm du lịch — giúp bạn tìm lại
                địa danh qua những bức ảnh tưởng như vô danh.
              </p>
              <p className="text-base leading-loose text-[#4a3d35]">
                Dù là một góc phố cổ, một chiếc cổng trường quen thuộc hay một
                quán cà phê bên hồ, bạn sẽ tìm lại được nơi ấy — nơi kỷ niệm bắt
                đầu.
              </p>
              <Button
                type="primary"
                size="large"
                className="bg-[#7e5c49] hover:bg-[#5a3e36] border-none rounded-full !mt-4 !px-8"
              >
                <Link to="/caption-image">Khám phá ngay</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section 3: Cách hoạt động (Ảnh bên phải) */}
        <section className="min-h-screen flex flex-col justify-center !px-6 !py-20">
          <div
            className="w-full grid md:grid-cols-2 gap-10 items-center mx-auto"
            data-aos="fade-up"
          >
            {/* Nội dung bên trái */}
            <div
              className="space-y-4 text-left"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <h2 className="text-2xl font-bold text-[#5e463a]">
                Cách hoạt động
              </h2>
              <p className="text-base leading-loose text-[#4a3d35]">
                Khi bạn tải ảnh lên, hệ thống sử dụng công nghệ nhận diện hình
                ảnh kết hợp dữ liệu bản đồ và kiến trúc đặc trưng của Hà Nội để
                đưa ra gợi ý về địa điểm có khả năng cao nhất.
              </p>
              <p className="mt-4 text-base leading-loose text-[#4a3d35]">
                Tất cả quá trình đều được xử lý tự động và riêng tư, giúp bạn
                không chỉ nhớ lại nơi ấy mà còn khám phá thêm những điều thú vị
                quanh khu vực đó.
              </p>
            </div>

            {/* Ảnh bên phải */}
            <img
              src={sampleImage}
              alt="Cách hoạt động"
              className="w-full rounded-xl shadow-xl border border-[#d6c9b8]"
              data-aos="zoom-in"
              data-aos-delay="300"
            />
          </div>
        </section>

        {/* Section 4: Tầm nhìn (Ảnh bên trái) */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center !px-6 !py-20 bg-[#faf2e8]">
          <div
            className="w-full grid md:grid-cols-2 gap-10 items-center mx-auto"
            data-aos="fade-up"
          >
            {/* Ảnh bên trái */}
            <img
              src={sampleImage}
              alt="Tầm nhìn"
              className="w-full rounded-xl shadow-xl border border-[#d6c9b8]"
              data-aos="zoom-in"
              data-aos-delay="200"
            />

            {/* Nội dung bên phải */}
            <div
              className="text-left space-y-4 md:order-last"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <h2 className="text-2xl font-bold text-[#5e463a] !mb-4">
                Tầm nhìn
              </h2>
              <p className="text-base leading-loose text-[#4a3d35]">
                Chúng tôi không chỉ muốn giúp bạn nhớ lại một địa điểm, mà còn
                mong muốn tạo ra một hành trình gợi lại ký ức, cảm xúc và những
                câu chuyện đã từng trải qua.
              </p>
              <p className="mt-4 text-base leading-loose text-[#4a3d35]">
                Trong tương lai, nền tảng sẽ hỗ trợ nhiều thành phố khác, tạo
                nên một bản đồ ký ức toàn diện – nơi mỗi bức ảnh đều mang một
                câu chuyện, mỗi câu chuyện đều mang một địa danh.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Về tác giả (Ảnh bên phải) */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center !px-6 !py-20">
          <div className="max-w-3xl" data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-xl font-semibold !mb-4 text-[#5e463a]">
              Về tác giả
            </h3>
            <p className="text-base leading-relaxed text-[#4a3d35]">
              Dự án được phát triển bởi một người trẻ yêu Hà Nội, yêu việc chụp
              lại những khoảnh khắc bình dị trên phố, và mong muốn giúp mọi
              người lưu giữ kỷ niệm theo một cách tinh tế, hiện đại nhưng đầy
              cảm xúc. Mong rằng bạn cũng sẽ tìm lại được những đoạn ký ức đẹp
              từ chính những bức ảnh của mình.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
