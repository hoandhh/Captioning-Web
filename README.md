# Image Captioning Web

**Giới thiệu tổng quan**  
Dự án này là một ứng dụng web cho phép người dùng và quản trị viên quản lý thông tin tài khoản, cargar nhịp hình ảnh, đồng thời tự động sinh caption cho ảnh. Phía máy chủ (Backend) sử dụng Python Flask kết nối với cơ sở dữ liệu MongoDB, còn giao diện (Frontend) được phát triển trên ReactJS, tích hợp Ant Design và Tailwind CSS để xây dựng trải nghiệm tối ưu cho người dùng.

---

## **Công nghệ sử dụng**

- **Backend (Flask + Python + BLIP)**  
  Ứng dụng Flask đảm nhiệm xử lý logic nghiệp vụ, xác thực người dùng, quản trị dữ liệu và điều phối các API.  
  - Flask: Xây dựng API RESTful  
  - MongoDB: Lưu trữ dữ liệu người dùng, hình ảnh, thông tin caption  
  - Python: Ngôn ngữ chính, phù hợp cho xử lý dữ liệu, AI/ML (khi tạo caption)
  - BLIP (Bootstrapped Language-Image Pretraining): Mô hình AI tạo caption cho hình ảnh dựa trên học sâu, giúp tự động sinh mô tả chính xác và tự nhiên.

- **Frontend (ReactJS + Ant Design + Tailwind CSS)**  
  Giao diện ReactJS cho phép xây dựng cấu trúc component linh hoạt. Ant Design mang đến bộ thành phần UI đẹp, còn Tailwind CSS giúp tùy biến phong cách nhanh chóng.  
  - ReactJS: Triển khai logic giao diện, quản lý trạng thái  
  - Ant Design: Bộ giao diện chuyên nghiệp, sẵn sàng sử dụng  
  - Tailwind CSS: Tùy chỉnh biểu diễn UI mạnh mẽ, tiện lợi

---

## **Tính năng chính**

- **Quản lý tài khoản người dùng**  
  - Đăng ký và đăng nhập tài khoản  
  - Đặt lại mật khẩu, thay đổi mật khẩu  
  - Quản lý hồ sơ (cập nhật thông tin cá nhân)

- **Chức năng quản trị**  
  - Quản lý người dùng (khóa/mở khóa, cập nhật, xóa)  
  - Quản lý và theo dõi hình ảnh tải lên  
  - Duyệt, cập nhật báo cáo người dùng  
  - Xem thống kê chung (hệ thống, báo cáo, người dùng)

- **Xử lý hình ảnh và sinh caption**  
  - Tải lên hình ảnh, tự động phân tích và sinh caption  
  - Cho phép người dùng chỉnh sửa caption tùy ý  
  - Hỗ trợ tái sinh caption nếu caption chưa ưng ý

- **Tìm kiếm và tương tác**  
  - Tìm kiếm người dùng theo nhiều tiêu chí  
  - Lấy thông tin chi tiết của người dùng khác  
  - Tương tác qua API RESTful, đảm bảo luồng công việc thông suốt giữa frontend và backend

---

## **Ưu điểm và Mục tiêu**

- **Trải nghiệm người dùng**: Giao diện tối ưu, hiện đại nhờ kết hợp giữa Ant Design và Tailwind CSS.  
- **Mở rộng dễ dàng**: Kiến trúc phân tách frontend-backend, thuận tiện cho việc bổ sung tính năng mới.  
- **Bảo mật**: Sử dụng các cơ chế xác thực an toàn, bảo vệ dữ liệu nhạy cảm.  
- **Tích hợp AI**: Tận dụng Python + các thư viện Machine Learning và mô hình BLIP (Bootstrapping Language-Image Pre-training) để sinh caption cho hình ảnh giúp nâng cao trải nghiệm.

---

**Chúc bạn có cái nhìn tổng quan về dự án và những tính năng mới mẻ mà nó mang lại!**
