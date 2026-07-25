---
name: "📝 Triển khai TODO (Chuẩn Conventional)"
about: "Tạo Issue từ TODO trong README.md với tiêu đề chuẩn Commit Message Convention."
title: "feat(week03): implement props and component communication (#3)"
labels: ["enhancement", "todo"]
assignees: "tuan, son"
---

## 1. Mô tả tính năng
> Truyền dữ liệu từ component cha xuống component con bằng Props. Sử dụng props.children để làm khung bọc Layout.

* **Loại tác vụ (Commit Type):** `feat` (Tính năng mới)
* **Phạm vi ảnh hưởng (Scope):** `week03`
* **TODO gốc trong README.md:** > ## TUẦN 3

---

## 2. Yêu cầu chi tiết
> Truyền dữ liệu tĩnh thông qua Props và thực hành Children.

* **Mô tả công việc (Đã cân bằng lại):**
    - [ ] **Refactor Card/Grid [Tuân]**: Sửa lại `CarCard` và `CarGrid` để nhận dữ liệu động qua Props thay vì code cứng.
    - [ ] **Wrapper & Table [Sơn]**: Tạo component `SpecTable` (bảng thông số kỹ thuật nhận Props), `SectionWrapper` (bọc content bằng `{children}`) và vẽ sơ đồ data flow.

* **Các file/module dự kiến chỉnh sửa (Cấu trúc phẳng):**
  - `src/components/CarCard.jsx` (Bổ sung tham số props)
  - `src/components/CarGrid.jsx` (Truyền props xuống CarCard)
  - `src/components/SpecTable.jsx` (Bảng thông số)
  - `src/components/SectionWrapper.jsx` (Sử dụng props.children)
  - `src/data/cars.js` (Tạo dữ liệu mock cứng chứa danh sách xe để truyền props)
  - `docs/week03-dataflow.png` (Sơ đồ luồng dữ liệu)
---

## 3. Tiêu chí hoàn thành (Definition of Done)
> Các điều kiện bắt buộc phải thỏa mãn để đóng Issue này.

- [ ] Tính năng hoạt động đúng yêu cầu kỹ thuật.
- [ ] **Đã xóa hoặc cập nhật dòng TODO tương ứng trong file `TODO.md` / `README.md`.**
- [ ] Pull Request giải quyết Issue này phải đặt tên theo chuẩn: `feat(week03): implement props and component communication (#3)`

---

## 4. Thông tin quản lý
> Phần dành cho Project Manager / Tech Lead để điều phối.
* **Độ ưu tiên (Priority):** 🔴 High
* **Ước lượng thời gian (Estimation):** 8 Giờ
* **Người kiểm thử / Reviewer:** Cả nhóm
