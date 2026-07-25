---
name: "📝 Triển khai TODO (Chuẩn Conventional)"
about: "Tạo Issue từ TODO trong README.md với tiêu đề chuẩn Commit Message Convention."
title: "feat(week04): implement events and useState (#4)"
labels: ["enhancement", "todo"]
assignees: "quy, son"
---

## 1. Mô tả tính năng
> Tạo tương tác động đầu tiên bằng `useState`. Làm việc với Controlled Component (ô tìm kiếm, bộ lọc xe).

* **Loại tác vụ (Commit Type):** `feat` (Tính năng mới)
* **Phạm vi ảnh hưởng (Scope):** `week04`
* **TODO gốc trong README.md:** > ## TUẦN 4

---

## 2. Yêu cầu chi tiết
> Quản lý State bằng useState và xử lý sự kiện (Events).

* **Mô tả công việc (Đã cân bằng lại):**
    - [ ] **UI Forms & Compare State [Quý]**: Tạo giao diện `SearchBar`, `CarFilter`. Xử lý State lưu danh sách xe được chọn để so sánh (Compare State).
    - [ ] **Lọc danh sách xe [Son]**: Áp dụng Lifting State Up cho bộ lọc tại `CarListPage`, xử lý Derived State (lọc danh sách mảng dựa trên state gốc).

* **Các file/module dự kiến chỉnh sửa (Cấu trúc phẳng):**
  - `src/pages/CarListPage.jsx` (Chứa state lọc & logic render list xe)
  - `src/pages/ComparePage.jsx` (Chứa state 2 xe đang được chọn)
  - `src/components/SearchBar.jsx` (Input tìm kiếm - Controlled Component)
  - `src/components/CarFilter.jsx` (Select/Radio lọc - Controlled Component)
  - `src/components/CarCard.jsx` (Thêm nút bấm chọn xe để so sánh)
---

## 3. Tiêu chí hoàn thành (Definition of Done)
> Các điều kiện bắt buộc phải thỏa mãn để đóng Issue này.

- [ ] Tính năng hoạt động đúng yêu cầu kỹ thuật.
- [ ] **Đã xóa hoặc cập nhật dòng TODO tương ứng trong file `TODO.md` / `README.md`.**
- [ ] Pull Request giải quyết Issue này phải đặt tên theo chuẩn: `feat(week04): implement events and useState (#4)`

---

## 4. Thông tin quản lý
> Phần dành cho Project Manager / Tech Lead để điều phối.
* **Độ ưu tiên (Priority):** 🔴 High
* **Ước lượng thời gian (Estimation):** 8 Giờ
* **Người kiểm thử / Reviewer:** Cả nhóm
