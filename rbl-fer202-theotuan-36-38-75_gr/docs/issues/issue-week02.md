---
name: "📝 Triển khai TODO (Chuẩn Conventional)"
about: "Tạo Issue từ TODO trong README.md với tiêu đề chuẩn Commit Message Convention."
title: "feat(week02): implement functional components and jsx (#2)"
labels: ["enhancement", "todo"]
assignees: "van-anh, sang"
---

## 1. Mô tả tính năng
> Dựng khung giao diện tĩnh cho showroom siêu xe. Render danh sách siêu xe tĩnh sử dụng phương thức `map()`.

* **Loại tác vụ (Commit Type):** `feat` (Tính năng mới)
* **Phạm vi ảnh hưởng (Scope):** `week02`
* **TODO gốc trong README.md:** > ## TUẦN 2

---

## 2. Yêu cầu chi tiết
> Chi tiết các nhiệm vụ và file cần tạo mới/chỉnh sửa.

* **Mô tả công việc (Đã điều chỉnh lại):**
    - [x] **Navbar, Footer & Layout [Văn Anh]**: Tạo khung điều hướng trên/dưới. Lắp ráp chúng vào `App.jsx`.
    - [x] **Các Component còn lại [Sang]**: Thiết kế `Banner` (quảng cáo), `BrandCard` (thẻ hãng), `CarCard` (hiển thị 1 xe) và `CarGrid` (dùng `.map()` render danh sách).

* **Các file/module dự kiến chỉnh sửa (Cấu trúc phẳng):**
  - `src/App.jsx` (Lắp ráp layout chính)
  - `src/pages/HomePage.jsx` (Lắp ráp Banner, CarGrid, BrandCard)
  - `src/components/Navbar.jsx` (Thanh điều hướng)
  - `src/components/Footer.jsx` (Chân trang)
  - `src/components/Banner.jsx` (Banner quảng cáo)
  - `src/components/CarCard.jsx` (Thẻ hiển thị xe)
  - `src/components/CarGrid.jsx` (Lưới hiển thị danh sách xe)
  - `src/components/BrandCard.jsx` (Thẻ hiển thị hãng)
---

## 3. Tiêu chí hoàn thành (Definition of Done)
> Các điều kiện bắt buộc phải thỏa mãn để đóng Issue này.

- [ ] Tính năng hoạt động đúng yêu cầu kỹ thuật.
- [ ] **Đã xóa hoặc cập nhật dòng TODO tương ứng trong file `TODO.md` / `README.md`.**
- [ ] Pull Request giải quyết Issue này phải đặt tên theo chuẩn: `feat(week02): implement functional components and jsx (#2)`

---

## 4. Thông tin quản lý
> Phần dành cho Project Manager / Tech Lead để điều phối.
* **Độ ưu tiên (Priority):** 🔴 High
* **Ước lượng thời gian (Estimation):** 8 Giờ
* **Người kiểm thử / Reviewer:** Cả nhóm
