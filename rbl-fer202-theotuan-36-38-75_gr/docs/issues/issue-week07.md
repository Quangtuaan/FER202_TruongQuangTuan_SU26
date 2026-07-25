---
name: "📝 Triển khai TODO (Chuẩn Conventional)"
about: "Tạo Issue từ TODO trong README.md với tiêu đề chuẩn Commit Message Convention."
title: "feat(week07): implement advanced built-in hooks (#7)"
labels: ["enhancement", "todo"]
assignees: "van-anh, sang"
---

## 1. Mô tả tính năng
> Dùng `useContext` quản lý tài khoản và yêu thích, `useEffect` để tải dữ liệu, `useRef` focus tìm kiếm.

* **Loại tác vụ (Commit Type):** `feat` (Tính năng mới)
* **Phạm vi ảnh hưởng (Scope):** `week07`
* **TODO gốc trong README.md:** > ## TUẦN 7

---

## 2. Yêu cầu chi tiết
> Sử dụng các built-in Hooks nâng cao (Context, Effect, Ref).

* **Mô tả công việc (Đã cân bằng lại):**
    - [ ] **AuthContext & Effects [Văn Anh]**: Tạo AuthContext giữ state đăng nhập. Dùng useEffect tạo Loading spinner và đổi tựa đề tab trình duyệt.
    - [ ] **CarContext & Refs [Sang]**: Tạo CarContext quản lý danh sách xe yêu thích và bộ lọc. Dùng useRef để auto-focus vào thanh tìm kiếm.

* **Các file/module dự kiến chỉnh sửa (Cấu trúc phẳng):**
  - `src/context/AuthContext.jsx` (Provider quản lý đăng nhập)
  - `src/context/CarContext.jsx` (Provider quản lý lọc/tim xe)
  - `src/App.jsx` (Bọc các Provider bao ngoài các Routes)
  - `src/components/Navbar.jsx` (Hiển thị Avatar nếu AuthContext = true)
  - `src/pages/LoginPage.jsx` (Form đăng nhập update AuthContext)
  - `src/pages/SearchPage.jsx` (Dùng useRef focus input)
---

## 3. Tiêu chí hoàn thành (Definition of Done)
> Các điều kiện bắt buộc phải thỏa mãn để đóng Issue này.

- [ ] Tính năng hoạt động đúng yêu cầu kỹ thuật.
- [ ] **Đã xóa hoặc cập nhật dòng TODO tương ứng trong file `TODO.md` / `README.md`.**
- [ ] Pull Request giải quyết Issue này phải đặt tên theo chuẩn: `feat(week07): implement advanced built-in hooks (#7)`

---

## 4. Thông tin quản lý
> Phần dành cho Project Manager / Tech Lead để điều phối.
* **Độ ưu tiên (Priority):** 🔴 High
* **Ước lượng thời gian (Estimation):** 8 Giờ
* **Người kiểm thử / Reviewer:** Cả nhóm
