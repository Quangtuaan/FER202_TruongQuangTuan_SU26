---
name: "📝 Triển khai TODO (Chuẩn Conventional)"
about: "Tạo Issue từ TODO trong README.md với tiêu đề chuẩn Commit Message Convention."
title: "feat(week05): integrate react-bootstrap and responsive grid (#5)"
labels: ["enhancement", "todo"]
assignees: "van anh, tuan"
---

## 1. Mô tả tính năng
> Tích hợp thư viện React-Bootstrap 2.x. Áp dụng hệ thống lưới Grid (Container, Row, Col) để giao diện responsive.

* **Loại tác vụ (Commit Type):** `feat` (Tính năng mới)
* **Phạm vi ảnh hưởng (Scope):** `week05`
* **TODO gốc trong README.md:** > ## TUẦN 5

---

## 2. Yêu cầu chi tiết
> Tích hợp giao diện Responsive bằng React-Bootstrap.

* **Mô tả công việc (Đã cân bằng lại):**
    - [ ] **Cài đặt & Header [Van anh]**: Cài `react-bootstrap`, nhúng CSS. Áp dụng Offcanvas cho Navbar và Carousel cho Banner.Thiết kế thêm Component `TechProwess` (dải ngang 5 cột thông số xe theo đúng Mockup).
    - [ ] **Grid & Responsive [Tuân]**: Áp dụng Grid System (Row, Col) cho CarGrid. Đảm bảo UI co giãn tốt trên Mobile, Tablet, PC.

* **Các file/module dự kiến chỉnh sửa (Cấu trúc phẳng):**
  - `package.json` (Cài `react-bootstrap` & `bootstrap`)
  - `src/main.jsx` (Import css bootstrap gốc)
  - `src/components/Navbar.jsx` (Chuyển sang dùng Navbar/Offcanvas bootstrap)
  - `src/components/Banner.jsx` (Chuyển sang Carousel bootstrap)
  - `src/components/CarCard.jsx` (Chuyển sang Card bootstrap)
  - `src/components/CarGrid.jsx` (Dùng Row, Col của bootstrap)
  - `src/components/TechProwess.jsx` (Component dải thông số ngang 5 cột)
---

## 3. Tiêu chí hoàn thành (Definition of Done)
> Các điều kiện bắt buộc phải thỏa mãn để đóng Issue này.

- [ ] Tính năng hoạt động đúng yêu cầu kỹ thuật.
- [ ] **Đã xóa hoặc cập nhật dòng TODO tương ứng trong file `TODO.md` / `README.md`.**
- [ ] Pull Request giải quyết Issue này phải đặt tên theo chuẩn: `feat(week05): integrate react-bootstrap and responsive grid (#5)`

---

## 4. Thông tin quản lý
> Phần dành cho Project Manager / Tech Lead để điều phối.
* **Độ ưu tiên (Priority):** 🔴 High
* **Ước lượng thời gian (Estimation):** 8 Giờ
* **Người kiểm thử / Reviewer:** Cả nhóm
