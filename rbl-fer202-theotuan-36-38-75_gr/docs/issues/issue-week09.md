---
name: "📝 Triển khai TODO (Chuẩn Conventional)"
about: "Tạo Issue từ TODO trong README.md với tiêu đề chuẩn Commit Message Convention."
title: "feat(week09): implement custom hooks and refactor (#9)"
labels: ["enhancement", "todo"]
assignees: "quy, van-anh"
---

## 1. Mô tả tính năng
> Tự viết các Custom Hooks để đóng gói logic. Áp dụng Debounce giảm tải gọi API.

* **Loại tác vụ (Commit Type):** `feat` (Tính năng mới)
* **Phạm vi ảnh hưởng (Scope):** `week09`
* **TODO gốc trong README.md:** > ## TUẦN 9

---

## 2. Yêu cầu chi tiết
> Viết Custom Hooks để tái sử dụng logic (DRY).

* **Mô tả công việc (Đã cân bằng lại):**
    - [ ] **Fetch & Debounce [Quý]**: Viết `useFetch`, `useDebounce` giảm tải gọi API mỗi khi user gõ phím. Áp dụng vào SearchPage.
    - [ ] **LocalStorage [Văn Anh]**: Viết `useLocalStorage` lưu trữ danh sách xe yêu thích xuống ổ cứng trình duyệt.

* **Các file/module dự kiến chỉnh sửa (Cấu trúc phẳng):**
  - `src/hooks/useFetch.js` (Gói gọn logic gọi API + Loading + Error)
  - `src/hooks/useDebounce.js` (Delay 500ms chống spam API)
  - `src/hooks/useLocalStorage.js` (Lưu data cục bộ)
  - `src/pages/SearchPage.jsx` (Dùng debounce)
  - `src/pages/FavoritePage.jsx` (Đọc danh sách xe từ hook localStorage)
  - `src/components/CarCard.jsx` (Gọi hook cập nhật trạng thái yêu thích)
---

## 3. Tiêu chí hoàn thành (Definition of Done)
> Các điều kiện bắt buộc phải thỏa mãn để đóng Issue này.

- [ ] Tính năng hoạt động đúng yêu cầu kỹ thuật.
- [ ] **Đã xóa hoặc cập nhật dòng TODO tương ứng trong file `TODO.md` / `README.md`.**
- [ ] Pull Request giải quyết Issue này phải đặt tên theo chuẩn: `feat(week09): implement custom hooks and refactor (#9)`

---

## 4. Thông tin quản lý
> Phần dành cho Project Manager / Tech Lead để điều phối.
* **Độ ưu tiên (Priority):** 🔴 High
* **Ước lượng thời gian (Estimation):** 8 Giờ
* **Người kiểm thử / Reviewer:** Cả nhóm
