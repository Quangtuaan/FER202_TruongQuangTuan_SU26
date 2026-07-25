---
name: "📝 Triển khai TODO (Chuẩn Conventional)"
about: "Tạo Issue từ TODO trong README.md với tiêu đề chuẩn Commit Message Convention."
title: "feat(week06): implement routing with react-router-dom (#6)"
labels: ["enhancement", "todo"]
assignees: "van-anh, sang, tuan, quy"
---

## 1. Mô tả tính năng
> Chuyển đổi ứng dụng thành Single Page Application (SPA). Đọc tham số động (`useParams`).

* **Loại tác vụ (Commit Type):** `feat` (Tính năng mới)
* **Phạm vi ảnh hưởng (Scope):** `week06`
* **TODO gốc trong README.md:** > ## TUẦN 6

---

## 2. Yêu cầu chi tiết
> Cấu hình định tuyến (Routing) cho toàn bộ SPA.

* **Mô tả công việc (Chia 4 người):**
    - [ ] **Cấu hình Core [Tuân]**: Cài `react-router-dom`, bọc `BrowserRouter` tại `main.jsx` và thiết lập khung `<Routes>` tại `App.jsx`.
    - [x] **Route Tĩnh [Sang]**: Khởi tạo và gắn Route cho nhóm trang hiển thị (Home, CarList, Compare, Brand, News, Gallery, Contact).
    - [ ] **Route Form/User [Văn Anh]**: Khởi tạo và gắn Route cho nhóm trang người dùng (Login, Register, Favorite, About, Search).
    - [ ] **Dynamic & Protected [Quý]**: Cấu hình route động `:id` và dùng `useParams()` cho trang chi tiết. Viết `ProtectedRoute` bảo vệ `AdminDashboard`.

* **Các file/module dự kiến chỉnh sửa (Cấu trúc phẳng):**
  - `src/main.jsx` (Bọc BrowserRouter)
  - `src/App.jsx` (Khai báo thẻ Routes & Route)
  - `src/components/ProtectedRoute.jsx` (Logic chặn truy cập)
  - `src/pages/HomePage.jsx`
  - `src/pages/CarListPage.jsx`
  - `src/pages/CarDetailPage.jsx` (Bắt ID qua useParams)
  - `src/pages/ComparePage.jsx`
  - `src/pages/BrandPage.jsx`
  - `src/pages/NewsPage.jsx`
  - `src/pages/GalleryPage.jsx`
  - `src/pages/LoginPage.jsx`
  - `src/pages/RegisterPage.jsx`
  - `src/pages/FavoritePage.jsx`
  - `src/pages/ContactPage.jsx`
  - `src/pages/AboutPage.jsx`
  - `src/pages/SearchPage.jsx`
  - `src/pages/AdminDashboard.jsx` (Được bọc bởi ProtectedRoute)
---

## 3. Tiêu chí hoàn thành (Definition of Done)
> Các điều kiện bắt buộc phải thỏa mãn để đóng Issue này.

- [ ] Tính năng hoạt động đúng yêu cầu kỹ thuật.
- [ ] **Đã xóa hoặc cập nhật dòng TODO tương ứng trong file `TODO.md` / `README.md`.**
- [ ] Pull Request giải quyết Issue này phải đặt tên theo chuẩn: `feat(week06): implement routing with react-router-dom (#6)`

---

## 4. Thông tin quản lý
> Phần dành cho Project Manager / Tech Lead để điều phối.
* **Độ ưu tiên (Priority):** 🔴 High
* **Ước lượng thời gian (Estimation):** 8 Giờ
* **Người kiểm thử / Reviewer:** Cả nhóm
