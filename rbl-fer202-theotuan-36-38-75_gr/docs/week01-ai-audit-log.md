# Tuần 01 — Nhật ký AI & Project (AI Audit Log)

Dự án: **ATELIER — Luxury Supercar Showroom**

---

## 📘 BẢNG 1: Nhật ký sử dụng AI (AI_AUDIT_LOG)

| Ngày (*) | TV (*) | Công cụ AI (*) | Mục đích sử dụng (*) | File ảnh hưởng | Mức hỗ trợ (*) | Đã chỉnh sửa gì? | Kiểm chứng |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01/07 | Văn Anh | ChatGPT-4o | Tư vấn cấu trúc thư mục chuẩn cho project React 18 + Vite | `src/`, `package.json` | Low | Bỏ thư mục redux (quá sớm), tự viết lại `index.css` global. | Đối chiếu tài liệu Vite, `npm run dev` chạy OK. |
| 02/07 | Sang | v0 by Vercel | Generate mockup trang chủ (Navbar, Banner, CarGrid). | `docs/mockup/homepage.png` | High | Iterate 3 lần: Yêu cầu đổi sang dark mode đen nhám & vàng gold. | Đối chiếu checklist 5/5 component trang chủ. |
| 03/07 | Sơn | Claude 3.5 | Thiết kế cấu trúc `db.json`: mảng cars (12 fields) và brands. | `db.json` | Medium | Sửa price thành number, thay ảnh URL thật từ Unsplash. | Chạy `json-server` trả đúng mảng 6 siêu xe. |
| 04/07 | Quý | ChatGPT-4o | Vẽ Component Tree dạng text từ mockup. | `docs/component-tree.md` | Medium | Gộp `CarCard` bị trùng lặp, bổ sung thêm `Footer`. | Review chéo cả nhóm, khớp hoàn toàn mockup. |
| 05/07 | Tuân | GitHub Copilot | Sinh nội dung mô tả file README.md cho project Vite. | `README.md` | Low | Viết lại tiếng Việt, thêm dòng hướng dẫn bật `json-server`. | Render đúng format Markdown trên GitHub. |

---

## 📗 BẢNG 2: Nhật ký thay đổi project (CHANGELOG)

| Loại (*) | TV (*) | Mô tả thay đổi (*) | File liên quan | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| **Added** | Văn Anh | Khởi tạo repo `rbl-fer202...`: Vite + react-bootstrap + react-router-dom + axios | `package.json` | Chạy lệnh `npm run dev` thành công. |
| **Added** | Sơn | Tạo file `db.json`: 6 siêu xe, 6 hãng xe với đủ 12 trường thông tin. | `db.json` | Đúng chuẩn JSON. |
| **Added** | Sang | Hoàn thành bộ mockup tĩnh giao diện trang chủ và chi tiết. | `docs/mockup/` | Đã xuất ra file PNG. |
| **Changed**| Quý | Cập nhật Component Tree: Tách `CarGrid` ra khỏi `HomePage` để tái sử dụng. | `docs/component-tree.md` | |
| **Fixed** | Sơn | Sửa `db.json`: Chuyển giá xe từ chuỗi `"230000$"` thành số nguyên `230000`. | `db.json` | Fix để sau này code logic Sort/Filter dễ hơn. |
| **Fixed** | Văn Anh | Sửa lỗi thư mục rỗng (mockup) không đẩy được lên GitHub. | `docs/mockup/.gitkeep` | Khắc phục bằng file `.gitkeep`. |

---

## 🪪 BẢNG 3: Nhật ký Prompt AI (PROMPTS)

| Prompt # | TV | Công cụ AI | Nội dung Prompt và Đánh giá |
| :--- | :--- | :--- | :--- |
| **#1** | Sang | v0 by Vercel | **Prompt đã dùng:** "Design a homepage for a luxury supercar showroom named 'ATELIER'. Dark mode with gold accents. Include: top navbar, hero banner with CTA, featured brands, and a grid of 6 supercar cards."<br><br>**Kết quả AI trả về:** Giao diện sinh ra khá đẹp nhưng chia Grid đang là 3 cột, màu vàng chói quá.<br>**Nhóm đã chỉnh sửa:** Dùng Figma chỉnh lại thành Grid 4 cột, đổi mã màu chuẩn thành `#D4AF37`.<br>**Kiểm chứng:** Khớp 100% với yêu cầu thẩm mỹ của dự án. |
| **#2** | Sơn | Claude 3.5 | **Prompt đã dùng:** "Thiết kế cấu trúc db.json cho json-server của website bán siêu xe. Gồm 2 mảng: cars (id, name, brand, type, price, horsepower, imageUrl) và brands. Sinh 6 dữ liệu xe thực tế."<br><br>**Kết quả AI trả về:** AI sinh cấu trúc tốt nhưng link ảnh (imageUrl) toàn là link hỏng (404), giá tiền dạng chuỗi.<br>**Nhóm đã chỉnh sửa:** Lên Unsplash tìm link ảnh thật dán vào, ép kiểu price về Number.<br>**Kiểm chứng:** Lệnh GET `/cars` qua json-server hoạt động mượt mà. |
| **#3** | Quý | ChatGPT-4o | **Prompt đã dùng:** "Dựa trên thiết kế Mockup trang chủ, hãy vẽ sơ đồ Component Tree cho ứng dụng React. Chỉ rõ các Component nào có thể tái sử dụng."<br><br>**Kết quả AI trả về:** AI chia cây rất hợp lý nhưng tách thẻ Xe thành 2 loại `HomeCarCard` và `ListCarCard` gây dư thừa.<br>**Nhóm đã chỉnh sửa:** Gộp lại thành 1 Component `CarCard` duy nhất.<br>**Kiểm chứng:** Cả nhóm review đồng thuận dùng làm sơ đồ chốt cho Tuần 2. |

---

## 📙 BẢNG 4: Suy ngẫm cuối tuần (REFLECTION)

**Thành viên A (Văn Anh - Khởi tạo Project)**
* **Đã làm gì:** Tạo GitHub repo, cấu hình Vite project, cài Bootstrap/Axios, viết README.
* **AI đã hỗ trợ:** ChatGPT tư vấn cấu trúc thư mục chuẩn cho React.
* **AI sai hoặc thiếu ở đâu:** AI đề xuất tạo thư mục và cài đặt luôn Redux ngay từ tuần 1 (quá sớm so với lộ trình học).
* **Khó khăn gặp phải:** Gặp Conflict nhẹ khi Push code lần đầu do chưa gõ lệnh Pull trước.
* **Cải thiện điều gì:** Rút kinh nghiệm tuân thủ quy trình Git cơ bản: Phải `git pull` trước khi `git push`.

**Thành viên B (Sang - Mockup Design)**
* **Đã làm gì:** Thiết kế giao diện Trang chủ + Danh sách xe bằng công cụ AI (Stitch/v0).
* **AI đã hỗ trợ:** Generate layout nhanh trong 5 phút, tiết kiệm 3 tiếng so với vẽ tay trên Figma.
* **AI sai hoặc thiếu ở đâu:** AI không hiểu được sự tinh tế của "Màu Vàng Gold", sinh ra màu vàng chanh nhìn hơi quê.
* **Khó khăn gặp phải:** Khó khăn trong việc mô tả chi tiết UI bằng Tiếng Anh để AI hiểu đúng ý.
* **Cải thiện điều gì:** Lên list tính năng bằng tiếng Việt trước, dịch cẩn thận rồi mới đưa vào Prompt để AI sinh kết quả sát nhất.

**Thành viên D (Sơn - Database)**
* **Đã làm gì:** Thiết kế `db.json` với dữ liệu siêu xe mẫu, chạy thử JSON-Server.
* **AI đã hỗ trợ:** Claude sinh cấu trúc mảng và Fake Data rất nhanh, chuẩn JSON format.
* **AI sai hoặc thiếu ở đâu:** AI gán kiểu String cho các biến lưu Trọng lượng xe và Giá tiền.
* **Khó khăn gặp phải:** Phân vân giữa việc gộp chung hay tách mảng Brands và Cars độc lập.
* **Cải thiện điều gì:** Từ tuần sau, khi bắt AI sinh JSON sẽ yêu cầu rõ ràng Schema kiểu dữ liệu từ đầu (VD: price bắt buộc là Integer).
