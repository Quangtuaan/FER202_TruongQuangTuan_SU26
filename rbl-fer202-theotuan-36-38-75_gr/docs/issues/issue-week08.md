---
name: "📝 Triển khai TODO (Chuẩn Conventional)"
about: "Tạo Issue từ TODO trong README.md với tiêu đề chuẩn Commit Message Convention."
title: "feat(week08): integrate axios and json-server crud (#8)"
labels: ["enhancement", "todo"]
assignees: "tuan, son"
---

## 1. Mô tả tính năng
> Kết nối ứng dụng Frontend với JSON-Server. Sử dụng Axios thực hiện tính năng CRUD siêu xe.

* **Loại tác vụ (Commit Type):** `feat` (Tính năng mới)
* **Phạm vi ảnh hưởng (Scope):** `week08`
* **TODO gốc trong README.md:** > ## TUẦN 8

---

## 2. Yêu cầu chi tiết
> Cấu hình Axios, gọi API thật và chức năng Admin CRUD.

* **Mô tả công việc (Đã cân bằng lại):**
    - [ ] **API Config & Client Pages [Tuân]**: Cài đặt `axiosClient.js` chặn Interceptors. Sửa các trang `HomePage`, `CarListPage`, `CarDetailPage` sang fetch dữ liệu thật từ API thay vì mock data.
    - [ ] **Admin CRUD & Docs [Sơn]**: Dựng logic lấy, thêm, sửa, xóa (CRUD) xe trong `AdminDashboard`. Cập nhật tài liệu endpoint API.

* **Các file/module dự kiến chỉnh sửa (Cấu trúc phẳng):**
  - `src/services/axiosClient.js` (Cấu hình domain, timeout, token)
  - `src/services/carService.js` (Chứa các hàm gọi CRUD)
  - `src/pages/AdminDashboard.jsx` (Giao diện bảng và form Thêm/Sửa/Xóa)
  - `src/pages/HomePage.jsx` (Gọi API lấy xe nổi bật)
  - `src/pages/CarListPage.jsx` (Gọi API lấy danh sách)
  - `src/pages/CarDetailPage.jsx` (Gọi API lấy chi tiết)
  - `docs/week08-api.md` (Tài liệu tham chiếu)
---

## 3. Tiêu chí hoàn thành (Definition of Done)
> Các điều kiện bắt buộc phải thỏa mãn để đóng Issue này.

- [ ] Tính năng hoạt động đúng yêu cầu kỹ thuật.
- [ ] **Đã xóa hoặc cập nhật dòng TODO tương ứng trong file `TODO.md` / `README.md`.**
- [ ] Pull Request giải quyết Issue này phải đặt tên theo chuẩn: `feat(week08): integrate axios and json-server crud (#8)`

---

## 4. Thông tin quản lý
> Phần dành cho Project Manager / Tech Lead để điều phối.
* **Độ ưu tiên (Priority):** 🔴 High
* **Ước lượng thời gian (Estimation):** 8 Giờ
* **Người kiểm thử / Reviewer:** Cả nhóm
