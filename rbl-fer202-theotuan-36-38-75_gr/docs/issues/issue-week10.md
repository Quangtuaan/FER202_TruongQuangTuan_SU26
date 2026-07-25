---
name: "📝 Triển khai TODO (Chuẩn Conventional)"
about: "Tạo Issue từ TODO trong README.md với tiêu đề chuẩn Commit Message Convention."
title: "feat(week10): deploy, redux, lazy loading, and tailwind migration (#10)"
labels: ["enhancement", "todo"]
assignees: "sang, tuan"
---

## 1. Mô tả tính năng
> Quản lý State toàn cục bằng Redux Toolkit; Tối ưu tải bằng Lazy Loading; Trải nghiệm giao diện Tailwind CSS; Deploy Vercel.

* **Loại tác vụ (Commit Type):** `feat` (Tính năng mới)
* **Phạm vi ảnh hưởng (Scope):** `week10`
* **TODO gốc trong README.md:** > ## TUẦN 10

---

## 2. Yêu cầu chi tiết
> Chuyển đổi State quản lý bằng Redux, Tối ưu Lazy Load và Deploy Vercel.

* **Mô tả công việc (Đã cân bằng lại):**
    - [ ] **Redux Toolkit [Sang]**: Cài đặt Store, chuyển đổi logic từ CarContext sang Redux Slices.
    - [ ] **Tailwind & Optimization [Tuân]**: Nhúng TailwindCSS, áp dụng vài utility. Sửa import 14 trang thành `React.lazy()` để tối ưu tốc độ. Đưa app lên Vercel.

* **Các file/module dự kiến chỉnh sửa (Cấu trúc phẳng):**
  - `package.json` (Cài tailwind, postcss, redux)
  - `tailwind.config.js` (Cấu hình class)
  - `src/index.css` (Gắn Tailwind directives)
  - `src/store/store.js` (Khởi tạo Redux Store)
  - `src/store/slices/carSlice.js` (Khai báo Action & Reducer)
  - `src/App.jsx` (Dùng React.lazy và Suspense bọc Routes)
  - `vercel.json` (Cấu hình rewrite chặn lỗi 404 router)
---

## 3. Tiêu chí hoàn thành (Definition of Done)
> Các điều kiện bắt buộc phải thỏa mãn để đóng Issue này.

- [ ] Tính năng hoạt động đúng yêu cầu kỹ thuật.
- [ ] **Đã xóa hoặc cập nhật dòng TODO tương ứng trong file `TODO.md` / `README.md`.**
- [ ] Pull Request giải quyết Issue này phải đặt tên theo chuẩn: `feat(week10): deploy, redux, lazy loading, and tailwind migration (#10)`

---

## 4. Thông tin quản lý
> Phần dành cho Project Manager / Tech Lead để điều phối.
* **Độ ưu tiên (Priority):** 🔴 High
* **Ước lượng thời gian (Estimation):** 8 Giờ
* **Người kiểm thử / Reviewer:** Cả nhóm
