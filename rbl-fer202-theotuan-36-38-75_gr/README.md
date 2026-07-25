[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/pKkSItSa)

# ATELIER — Luxury Supercar Showroom

ATELIER là một nền tảng trưng bày và khám phá siêu xe hạng sang trực tuyến, được thiết kế với giao diện Dark Mode sang trọng, hiệu ứng hình ảnh đỉnh cao và trải nghiệm người dùng mượt mà. Hệ thống cho phép người dùng duyệt danh sách siêu xe, xem thông số kỹ thuật chi tiết, so sánh xe, tìm kiếm theo hãng/loại và quản lý showroom qua Admin Dashboard.

Dự án được xây dựng cho môn học **FER202 (ReactJS)**.

---

## ✨ Tính năng nổi bật (Front-End Focus)
* **Giao diện Dark Mode & Glassmorphism**: Thiết kế tối cao cấp, nền gradient huyền bí kết hợp hiệu ứng kính mờ (blur/glassmorphism) giúp hình ảnh siêu xe trở nên nổi bật và sang trọng.
* **Trang chủ ấn tượng (HomePage)**: Banner toàn màn hình với siêu xe nổi bật, khu vực giới thiệu các mẫu xe mới nhất và bộ sưu tập theo hãng.
* **Danh sách xe (CarListPage)**: Lọc và duyệt xe theo hãng sản xuất, loại xe, khoảng giá và tốc độ tối đa.
* **Chi tiết xe (CarDetailPage)**: Hiển thị toàn bộ thông số kỹ thuật (động cơ, công suất, mô-men xoắn, tốc độ tối đa, 0–100 km/h), thư viện ảnh và video giới thiệu.
* **So sánh xe (ComparePage)**: So sánh song song thông số kỹ thuật của hai siêu xe bất kỳ.
* **Hãng xe (BrandPage)**: Trang tổng hợp danh sách hãng sản xuất huyền thoại (Lamborghini, Ferrari, Bugatti, McLaren...), dẫn đến danh sách xe theo hãng.
* **Tin tức & Review (NewsPage)**: Cập nhật thông tin mẫu xe mới ra mắt, bài đánh giá chuyên sâu và sự kiện siêu xe thế giới.
* **Thư viện ảnh/video (GalleryPage)**: Bộ sưu tập hình ảnh và video siêu xe chất lượng cao được phân loại theo hãng và dòng xe.
* **Tài khoản người dùng (LoginPage / RegisterPage)**: Đăng ký, đăng nhập để lưu xe yêu thích và đặt lịch lái thử.
* **Xe yêu thích (FavoritePage)**: Danh sách các siêu xe đã được người dùng đánh dấu yêu thích, cho phép so sánh nhanh.
* **Liên hệ & Đặt lịch (ContactPage)**: Form liên hệ showroom và đặt lịch lái thử xe trực tiếp.
* **Giới thiệu (AboutPage)**: Câu chuyện thương hiệu ATELIER, đội ngũ và triết lý kinh doanh siêu xe.
* **Tìm kiếm & Lọc xe (SearchPage)**: Tìm kiếm nhanh theo tên xe, hãng sản xuất hoặc thể loại, kết hợp bộ lọc nâng cao.
* **Admin Dashboard**: Quản lý danh sách xe (thêm, sửa, xóa), theo dõi lượt xem và thống kê dữ liệu showroom.
* **Thiết kế Responsive**: Giao diện tương thích mượt mà trên cả máy tính, máy tính bảng và điện thoại di động.

---

## 🚀 Công nghệ sử dụng
* **Frontend Core**: React 18 (Vite)
* **Styling**: Bootstrap 5.3 & React-Bootstrap 2.x kết hợp Custom CSS (cho các hiệu ứng glassmorphism, parallax, animation siêu xe).
* **Routing**: React Router DOM (v6) để chuyển trang không tải lại.
* **HTTP Client**: Axios (lấy dữ liệu xe từ API).
* **Mock Database & Server**: JSON-Server (giả lập danh sách xe, hãng sản xuất, thông số kỹ thuật).

---

## 📂 Cấu trúc thư mục dự án
Dự án được tổ chức cấu trúc phù hợp với ứng dụng showroom siêu xe:
```text
rbl-fer202-theotuan-36-38-75_gr/
├── public/          # Chứa tài nguyên tĩnh công cộng (Logo, ảnh tĩnh)
├── src/
│   ├── assets/      # Chứa hình ảnh siêu xe, logo hãng, banner mặc định
│   ├── components/  # Các component UI tái sử dụng
│   │   ├── Navbar.jsx      # Thanh điều hướng chính (Logo + Menu + Tìm kiếm)
│   │   ├── CarCard.jsx     # Thẻ hiển thị siêu xe (ảnh, tên, giá, nút xem chi tiết)
│   │   ├── CarFilter.jsx   # Bộ lọc xe theo hãng, loại, giá
│   │   ├── BrandCard.jsx   # Thẻ hiển thị hãng sản xuất
│   │   └── Footer.jsx      # Chân trang
│   ├── context/     # Quản lý trạng thái toàn cục (giỏ hàng yêu thích, bộ lọc)
│   ├── pages/       # Các trang giao diện chính
│   │   ├── HomePage.jsx          # Trang chủ (Banner, xe nổi bật, hãng xe)
│   │   ├── CarListPage.jsx       # Trang danh sách xe (lọc, tìm kiếm)
│   │   ├── CarDetailPage.jsx     # Trang chi tiết xe và thông số kỹ thuật
│   │   ├── ComparePage.jsx       # Trang so sánh hai siêu xe
│   │   ├── BrandPage.jsx         # Trang danh sách hãng xe nổi tiếng
│   │   ├── NewsPage.jsx          # Tin tức và review siêu xe mới nhất
│   │   ├── GalleryPage.jsx       # Thư viện ảnh/video siêu xe
│   │   ├── LoginPage.jsx         # Trang đăng nhập tài khoản
│   │   ├── RegisterPage.jsx      # Trang đăng ký tài khoản mới
│   │   ├── FavoritePage.jsx      # Danh sách xe yêu thích của người dùng
│   │   ├── ContactPage.jsx       # Liên hệ và đặt lịch lái thử xe
│   │   ├── AboutPage.jsx         # Giới thiệu về ATELIER showroom
│   │   ├── SearchPage.jsx        # Trang tìm kiếm xe nâng cao
│   │   └── AdminDashboard.jsx    # Trang quản trị showroom
│   ├── services/    # Các hàm gọi API (lấy danh sách xe, hãng sản xuất)
│   ├── hooks/       # Custom hooks (useCarFilter, useFavorite, ...)
│   ├── data/        # Dữ liệu tĩnh (danh sách hãng, loại xe)
│   ├── App.jsx      # Cấu hình Routing và bố cục chính
│   └── main.jsx     # Điểm khởi chạy của ứng dụng React
├── db.json          # Mock Database chứa danh sách xe, hãng, thông số kỹ thuật
├── package.json     # Chứa danh sách thư viện và câu lệnh scripts của dự án
└── README.md        # Tài liệu hướng dẫn sử dụng dự án
```

---

## ⚙️ Hướng dẫn cài đặt và chạy thử dự án

### 1. Cài đặt các thư viện cần thiết
Mở terminal tại thư mục gốc của project và chạy lệnh sau để tải các packages:
```bash
npm install
```

### 2. Khởi chạy Mock Database (JSON-Server)
Khởi chạy cơ sở dữ liệu mẫu chứa danh sách siêu xe và hãng sản xuất bằng lệnh:
```bash
npm run server
```
*Lưu ý: Mock API chạy tại địa chỉ: [http://localhost:3001](http://localhost:3001)*

### 3. Khởi chạy giao diện React (Vite)
Mở một cửa sổ terminal mới và chạy:
```bash
npm run dev
```
*Truy cập giao diện tại: [http://localhost:5173](http://localhost:5173)*

---

## 👥 Thành viên nhóm thực hiện dự án (FER202)
* **Văn Anh (Trưởng nhóm)**: Khởi tạo Project, cấu hình Routing và thiết kế Layout tổng thể (Navbar, Footer); xây dựng `LoginPage`, `RegisterPage` và bảo vệ route người dùng.
* **Sang**: Thiết kế giao diện Mockup (Figma), xây dựng `HomePage` (Banner, xe nổi bật), `BrandPage` (danh sách hãng xe) và xử lý Responsive toàn bộ giao diện.
* **Tuân**: Xây dựng các components `CarCard`, `BrandCard`, `CarFilter`; xây dựng `CarListPage`, `CarDetailPage`, `ComparePage` và `SearchPage`.
* **Sơn**: Xây dựng cấu trúc dữ liệu `db.json` (xe, hãng, thông số kỹ thuật); xây dựng `NewsPage`, `GalleryPage`, `AboutPage` và `ContactPage`; quản lý mock API JSON-Server.
* **Quý**: Quản lý State toàn cục (`CarContext` — yêu thích, bộ lọc); xây dựng `FavoritePage`, `AdminDashboard`; viết các custom hooks (`useCarFilter`, `useFavorite`) và tài liệu README.md.
