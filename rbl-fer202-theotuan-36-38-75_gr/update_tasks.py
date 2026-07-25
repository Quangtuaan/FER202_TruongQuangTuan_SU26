import re
import os

todo_content = """# TODO — CASE STUDY: ATELIER (Luxury Supercar Showroom)
## Hướng dẫn thực hành từng tuần — ReactJS (FER202)

**Stack:** React 18 + Vite + React-Bootstrap 2.x + Axios + JSON-Server  
**Nhóm:** 5 thành viên — phân công 2 thành viên làm chính mỗi tuần
**Template báo cáo:** `Case-Study/Template/WeekXX/WeekXX_BaoCaoNhom.docx`

> **Quy ước:**  
> - `[Văn Anh]` = Thành viên phụ trách chính tác vụ
> - `[REVIEW]` = Một thành viên khác review lại trước khi merge

---

## TUẦN 1 — KHỞI TẠO PROJECT & THIẾT KẾ GIAO DIỆN ATELIER

### 🎯 Mục tiêu
Thiết lập nền tảng kỹ thuật và thiết kế giao diện showroom siêu xe trực tuyến **ATELIER**. Nhóm thống nhất: luồng nghiệp vụ chính, phân chia vai trò, định hình giao diện qua Mockup, cấu hình cơ sở dữ liệu JSON cho các siêu xe, hãng sản xuất và thông số kỹ thuật.

### 📋 Phân công nhiệm vụ (Tuần 1: Cả nhóm)

| Thành viên | Nhiệm vụ |
|-----------|----------|
| Văn Anh | Tạo GitHub repo, cấu hình Vite project, tổ chức thư mục, cài đặt thư viện |
| Sang | Thiết kế màn hình Trang chủ (HomePage) + Hãng xe (BrandPage) bằng Figma |
| Tuân | Thiết kế màn hình Chi tiết xe (CarDetailPage) + So sánh xe (ComparePage) + Tin tức bằng Figma |
| Sơn | Thiết kế `db.json` — cấu trúc cơ sở dữ liệu siêu xe, hãng, thông số kỹ thuật |
| Quý | Vẽ Component Tree, viết `README.md`, tổng hợp prompt log thiết kế AI |

### ✅ Checklist công việc

**Khởi tạo project [Văn Anh]**
- [x] Tạo `package.json` với đầy đủ dependencies: react-bootstrap, bootstrap, react-router-dom, axios, json-server.
- [x] Cài các thư viện bắt buộc.
- [x] Tạo cấu trúc thư mục tiêu chuẩn.
- [x] Tạo `index.html`, `vite.config.js`, `src/main.jsx`, `src/App.jsx` (skeleton).
- [x] Tạo `src/index.css` với design system (CSS variables: màu nền, gold, font).

**Thiết kế mockup [cả nhóm]**
- [x] Thiết kế 17 màn hình chính.
- [x] Lưu ảnh PNG mockup vào `docs/mockup/`.
- [x] Ghi style guide tại `docs/mockup/style-guide.md`.

**Cơ sở dữ liệu db.json [Văn Anh]**
- [x] Thiết lập cấu trúc `db.json` gồm các thực thể chính (cars, brands, news, gallery, contacts, users).

**Tài liệu [Văn Anh]**
- [x] Vẽ Component Tree tại `docs/component-tree.md`.
- [x] Viết `README.md` đầy đủ.
- [x] Cập nhật `TODO.md` cho toàn bộ 10 tuần.

---

## TUẦN 2 — FUNCTIONAL COMPONENTS & JSX

### 🎯 Mục tiêu
Dựng khung giao diện tĩnh cho showroom siêu xe. Render danh sách siêu xe tĩnh sử dụng phương thức `map()`.

### 📋 Phân công nhiệm vụ (Tuần 2: Văn Anh, Sang)

| Thành viên | Nhiệm vụ |
|-----------|----------|
| Văn Anh | Navbar.jsx, Footer.jsx và tích hợp bố cục tổng thể vào App.jsx |
| Sang | Banner.jsx, CarCard.jsx, CarGrid.jsx, BrandCard.jsx |

### ✅ Checklist công việc
- [ ] **Navbar & Footer [Văn Anh]**: Logo ATELIER, menu điều hướng, Footer thông tin liên hệ.
- [ ] **Tích hợp [Văn Anh]**: Lắp ghép các component vào `App.jsx`.
- [ ] **Banner [Sang]**: Hiển thị ảnh siêu xe nổi bật toàn màn hình, tên xe, slogan.
- [ ] **CarCard & Grid [Sang]**: Card hiển thị siêu xe, sử dụng `.map()` render 6 xe.
- [ ] **BrandCard [Sang]**: Hiển thị logo hãng, quốc gia.

---

## TUẦN 3 — PROPS & COMPONENT COMMUNICATION

### 🎯 Mục tiêu
Truyền dữ liệu từ component cha xuống component con bằng `Props`. Sử dụng `props.children` để làm khung bọc Layout.

### 📋 Phân công nhiệm vụ (Tuần 3: Tuân, Sơn)

| Thành viên | Nhiệm vụ |
|-----------|----------|
| Tuân | Refactor CarCard.jsx, CarGrid.jsx, viết SpecTable.jsx qua props |
| Sơn | Viết SectionWrapper.jsx và vẽ Data Flow Diagram |

### ✅ Checklist công việc
- [ ] **Refactor Card/Grid [Tuân]**: Truyền thuộc tính động vào JSX, bắt sự kiện `onClick`.
- [ ] **SpecTable [Tuân]**: Component hiển thị bảng thông số kỹ thuật xe qua props.
- [ ] **SectionWrapper [Sơn]**: Bọc tiêu đề phân vùng và dùng `{children}`.
- [ ] **Data Flow [Sơn]**: Vẽ sơ đồ truyền props từ App xuống Grid.

---

## TUẦN 4 — XỬ LÝ SỰ KIỆN & useState

### 🎯 Mục tiêu
Tạo tương tác động đầu tiên bằng `useState`. Làm việc với Controlled Component (ô tìm kiếm, bộ lọc xe).

### 📋 Phân công nhiệm vụ (Tuần 4: Quý, Văn Anh)

| Thành viên | Nhiệm vụ |
|-----------|----------|
| Quý | Xây dựng SearchBar.jsx và CarFilter.jsx |
| Văn Anh | Quản lý state bộ lọc `filters`, Derived State và tính năng Compare xe |

### ✅ Checklist công việc
- [ ] **SearchBar & Filter [Quý]**: Tạo các controlled component tìm kiếm và lọc xe.
- [ ] **Quản lý Filters [Văn Anh]**: Xử lý Lifting State Up tại CarListPage.
- [ ] **Derived State [Văn Anh]**: Dùng `cars.filter(...)` hiển thị danh sách tương ứng.
- [ ] **Compare State [Văn Anh]**: Logic lưu tối đa 2 xe để so sánh.

---

## TUẦN 5 — REACT-BOOTSTRAP & GIAO DIỆN RESPONSIVE

### 🎯 Mục tiêu
Tích hợp thư viện **React-Bootstrap 2.x**. Áp dụng hệ thống lưới Grid (Container, Row, Col) để giao diện responsive.

### 📋 Phân công nhiệm vụ (Tuần 5: Sang, Tuân)

| Thành viên | Nhiệm vụ |
|-----------|----------|
| Sang | Bootstrap Navbar, Footer và Banner Carousel |
| Tuân | Bootstrap CarCard, Cấu hình Grid Responsive, Chụp ảnh test 3 màn hình |

### ✅ Checklist công việc
- [ ] **Navbar & Banner [Sang]**: Dùng Offcanvas và Carousel của Bootstrap.
- [ ] **Card & Grid [Tuân]**: Dùng Card, Row, Col thu phóng theo màn hình.
- [ ] **Responsive Test [Tuân]**: Chụp ảnh màn hình 375px, 768px, 1280px.

---

## TUẦN 6 — ROUTING VỚI REACT ROUTER DOM

### 🎯 Mục tiêu
Chuyển đổi ứng dụng thành Single Page Application (SPA). Đọc tham số động (`useParams`).

### 📋 Phân công nhiệm vụ (Tuần 6: Sơn, Quý)

| Thành viên | Nhiệm vụ |
|-----------|----------|
| Sơn | BrowserRouter, cấu hình Routes, LoginPage, RegisterPage |
| Quý | CarDetailPage (`useParams`), Navbar NavLink, ProtectedRoute |

### ✅ Checklist công việc
- [ ] **Cấu hình Routes [Sơn]**: Thiết lập BrowserRouter và 14 trang.
- [ ] **Dynamic Details [Quý]**: Lấy thông số kỹ thuật xe qua `useParams()`.
- [ ] **ProtectedRoute [Quý]**: Bảo vệ route `/admin`.

---

## TUẦN 7 — BUILT-IN HOOKS NÂNG CAO

### 🎯 Mục tiêu
Dùng `useContext` quản lý tài khoản và yêu thích, `useEffect` để tải dữ liệu, `useRef` focus tìm kiếm.

### 📋 Phân công nhiệm vụ (Tuần 7: Văn Anh, Sang)

| Thành viên | Nhiệm vụ |
|-----------|----------|
| Văn Anh | Xây dựng AuthContext.jsx |
| Sang | Xây dựng CarContext.jsx, useEffect fetch dữ liệu giả lập, useRef focus |

### ✅ Checklist công việc
- [ ] **AuthContext [Văn Anh]**: Quản lý state đăng nhập người dùng toàn cục.
- [ ] **CarContext [Sang]**: Quản lý danh sách yêu thích và bộ lọc.
- [ ] **Effects & Refs [Sang]**: Loading spinner, cập nhật Document Title, focus input.

---

## TUẦN 8 — AXIOS & JSON-SERVER (CRUD)

### 🎯 Mục tiêu
Kết nối ứng dụng Frontend với JSON-Server. Sử dụng **Axios** thực hiện tính năng CRUD siêu xe.

### 📋 Phân công nhiệm vụ (Tuần 8: Tuân, Sơn)

| Thành viên | Nhiệm vụ |
|-----------|----------|
| Tuân | Axios instance, `carService.js`, Fetch Data list xe lên giao diện |
| Sơn | AdminDashboard UI, thực hiện CRUD xe, viết API Spec |

### ✅ Checklist công việc
- [ ] **API Services [Tuân]**: Cấu hình Axios, xử lý các trạng thái API Loading/Error.
- [ ] **Admin CRUD [Sơn]**: Bảng danh sách, form Thêm/Sửa/Xóa.
- [ ] **Tài liệu API [Sơn]**: Ghi nhận Endpoints tại `docs/week08-api.md`.

---

## TUẦN 9 — CUSTOM HOOKS & REFACTOR CODE

### 🎯 Mục tiêu
Tự viết các Custom Hooks để đóng gói logic. Áp dụng Debounce giảm tải gọi API.

### 📋 Phân công nhiệm vụ (Tuần 9: Quý, Văn Anh)

| Thành viên | Nhiệm vụ |
|-----------|----------|
| Quý | Custom hook `useFetch`, `useDebounce`, Refactor SearchPage |
| Văn Anh | Custom hook `useLocalStorage`, tính năng FavoritePage |

### ✅ Checklist công việc
- [ ] **Hooks tối ưu [Quý]**: Viết hooks và gắn vào SearchPage để giảm 500ms delay.
- [ ] **LocalStorage [Văn Anh]**: Giữ danh sách xe yêu thích (thả tim) cục bộ.

---

## TUẦN 10 — NÂNG CAO & DEPLOY

### 🎯 Mục tiêu
Quản lý State toàn cục bằng **Redux Toolkit**; Tối ưu tải bằng **Lazy Loading**; Trải nghiệm giao diện **Tailwind CSS**; Deploy Vercel.

### 📋 Phân công nhiệm vụ (Tuần 10: Sang, Tuân)

| Thành viên | Nhiệm vụ |
|-----------|----------|
| Sang | Thiết lập Redux Toolkit (`carSlice.js`), di chuyển sang Redux |
| Tuân | React.lazy / Suspense, Migration Tailwind CSS nhỏ, Deploy Vercel |

### ✅ Checklist công việc
- [ ] **Redux Toolkit [Sang]**: Thay thế CarContext bằng Redux Slice.
- [ ] **Tailwind & Lazy [Tuân]**: Trì hoãn tải file JS, áp dụng vài utility Tailwind.
- [ ] **Deploy Vercel [Tuân]**: Đưa hệ thống lên môi trường live production.

---

## 📊 BẢNG THEO DÕI TIẾN ĐỘ NHÓM

| Tuần | Chủ đề chính | Assignees | Trạng thái |
|------|--------|------------------------------|------------|
| 1 | Setup & Design ATELIER | Cả nhóm | [x] |
| 2 | Components & JSX | Văn Anh, Sang | ☐ |
| 3 | Props & Communication | Tuân, Sơn | ☐ |
| 4 | Events & State | Quý, Văn Anh | ☐ |
| 5 | Bootstrap & Responsive | Sang, Tuân | ☐ |
| 6 | Routing & SPA | Sơn, Quý | ☐ |
| 7 | Built-in Hooks | Văn Anh, Sang | ☐ |
| 8 | Axios CRUD API | Tuân, Sơn | ☐ |
| 9 | Custom Hooks | Quý, Văn Anh | ☐ |
| 10 | Nâng cao & Deploy | Sang, Tuân | ☐ |

---

## 🔧 LỆNH THƯỜNG DÙNG

```bash
# Chạy dự án ở môi trường phát triển (development)
npm run dev                                    # Vite dev server (port 5173)
npm run server                                 # json-server chạy dữ liệu (port 3001)

# Kiểm tra mã nguồn trước khi commit
npm run lint                                   # Chạy ESLint kiểm tra lỗi cú pháp
npm run build                                  # Đóng gói sản phẩm production
```
"""

with open("TODO.md", "w", encoding="utf-8") as f:
    f.write(todo_content)

issues = {
    "week02": {
        "title": "feat(week02): implement functional components and jsx (#2)",
        "assignees": "van-anh, sang",
        "desc": "Dựng khung giao diện tĩnh cho showroom siêu xe. Render danh sách siêu xe tĩnh sử dụng phương thức `map()`.",
        "tasks": [
            "- [ ] **Navbar & Footer [Văn Anh]**: Logo ATELIER, menu điều hướng, Footer thông tin liên hệ.",
            "- [ ] **Tích hợp [Văn Anh]**: Lắp ghép các component vào `App.jsx`.",
            "- [ ] **Banner [Sang]**: Hiển thị ảnh siêu xe nổi bật toàn màn hình, tên xe, slogan.",
            "- [ ] **CarCard & Grid [Sang]**: Card hiển thị siêu xe, sử dụng `.map()` render 6 xe.",
            "- [ ] **BrandCard [Sang]**: Hiển thị logo hãng, quốc gia."
        ],
        "files": [
            "  - `src/components/Navbar.jsx`",
            "  - `src/components/Footer.jsx`",
            "  - `src/App.jsx`",
            "  - `src/components/Banner.jsx`",
            "  - `src/components/CarCard.jsx`",
            "  - `src/components/CarGrid.jsx`",
            "  - `src/components/BrandCard.jsx`"
        ]
    },
    "week03": {
        "title": "feat(week03): implement props and component communication (#3)",
        "assignees": "tuan, son",
        "desc": "Truyền dữ liệu từ component cha xuống component con bằng Props. Sử dụng props.children để làm khung bọc Layout.",
        "tasks": [
            "- [ ] **Refactor Card/Grid [Tuân]**: Truyền thuộc tính động vào JSX, bắt sự kiện `onClick`.",
            "- [ ] **SpecTable [Tuân]**: Component hiển thị bảng thông số kỹ thuật xe qua props.",
            "- [ ] **SectionWrapper [Sơn]**: Bọc tiêu đề phân vùng và dùng `{children}`.",
            "- [ ] **Data Flow [Sơn]**: Vẽ sơ đồ truyền props từ App xuống Grid."
        ],
        "files": [
            "  - `src/components/CarCard.jsx`",
            "  - `src/components/CarGrid.jsx`",
            "  - `src/components/SpecTable.jsx`",
            "  - `src/components/SectionWrapper.jsx`",
            "  - `docs/week03-dataflow.png`"
        ]
    },
    "week04": {
        "title": "feat(week04): implement events and useState (#4)",
        "assignees": "quy, van-anh",
        "desc": "Tạo tương tác động đầu tiên bằng `useState`. Làm việc với Controlled Component (ô tìm kiếm, bộ lọc xe).",
        "tasks": [
            "- [ ] **SearchBar & Filter [Quý]**: Tạo các controlled component tìm kiếm và lọc xe.",
            "- [ ] **Quản lý Filters [Văn Anh]**: Xử lý Lifting State Up tại CarListPage.",
            "- [ ] **Derived State [Văn Anh]**: Dùng `cars.filter(...)` hiển thị danh sách tương ứng.",
            "- [ ] **Compare State [Văn Anh]**: Logic lưu tối đa 2 xe để so sánh."
        ],
        "files": [
            "  - `src/components/SearchBar.jsx`",
            "  - `src/components/CarFilter.jsx`",
            "  - `src/pages/CarListPage.jsx`",
            "  - `src/components/CarCard.jsx`"
        ]
    },
    "week05": {
        "title": "feat(week05): integrate react-bootstrap and responsive grid (#5)",
        "assignees": "sang, tuan",
        "desc": "Tích hợp thư viện React-Bootstrap 2.x. Áp dụng hệ thống lưới Grid (Container, Row, Col) để giao diện responsive.",
        "tasks": [
            "- [ ] **Navbar & Banner [Sang]**: Dùng Offcanvas và Carousel của Bootstrap.",
            "- [ ] **Card & Grid [Tuân]**: Dùng Card, Row, Col thu phóng theo màn hình.",
            "- [ ] **Responsive Test [Tuân]**: Chụp ảnh màn hình 375px, 768px, 1280px."
        ],
        "files": [
            "  - `src/components/Navbar.jsx`",
            "  - `src/components/Footer.jsx`",
            "  - `src/components/Banner.jsx`",
            "  - `src/components/CarCard.jsx`",
            "  - `src/components/CarGrid.jsx`"
        ]
    },
    "week06": {
        "title": "feat(week06): implement routing with react-router-dom (#6)",
        "assignees": "son, quy",
        "desc": "Chuyển đổi ứng dụng thành Single Page Application (SPA). Đọc tham số động (`useParams`).",
        "tasks": [
            "- [ ] **Cấu hình Routes [Sơn]**: Thiết lập BrowserRouter và 14 trang.",
            "- [ ] **Dynamic Details [Quý]**: Lấy thông số kỹ thuật xe qua `useParams()`.",
            "- [ ] **ProtectedRoute [Quý]**: Bảo vệ route `/admin`."
        ],
        "files": [
            "  - `src/main.jsx`",
            "  - `src/App.jsx`",
            "  - `src/pages/*.jsx` (các trang UI)",
            "  - `src/components/ProtectedRoute.jsx`"
        ]
    },
    "week07": {
        "title": "feat(week07): implement advanced built-in hooks (#7)",
        "assignees": "van-anh, sang",
        "desc": "Dùng `useContext` quản lý tài khoản và yêu thích, `useEffect` để tải dữ liệu, `useRef` focus tìm kiếm.",
        "tasks": [
            "- [ ] **AuthContext [Văn Anh]**: Quản lý state đăng nhập người dùng toàn cục.",
            "- [ ] **CarContext [Sang]**: Quản lý danh sách yêu thích và bộ lọc.",
            "- [ ] **Effects & Refs [Sang]**: Loading spinner, cập nhật Document Title, focus input."
        ],
        "files": [
            "  - `src/context/AuthContext.jsx`",
            "  - `src/context/CarContext.jsx`",
            "  - `src/pages/SearchPage.jsx`",
            "  - `src/App.jsx`"
        ]
    },
    "week08": {
        "title": "feat(week08): integrate axios and json-server crud (#8)",
        "assignees": "tuan, son",
        "desc": "Kết nối ứng dụng Frontend với JSON-Server. Sử dụng Axios thực hiện tính năng CRUD siêu xe.",
        "tasks": [
            "- [ ] **API Services [Tuân]**: Cấu hình Axios, xử lý các trạng thái API Loading/Error.",
            "- [ ] **Admin CRUD [Sơn]**: Bảng danh sách, form Thêm/Sửa/Xóa.",
            "- [ ] **Tài liệu API [Sơn]**: Ghi nhận Endpoints tại `docs/week08-api.md`."
        ],
        "files": [
            "  - `src/services/axiosClient.js`",
            "  - `src/services/carService.js`",
            "  - `src/pages/AdminDashboard.jsx`",
            "  - `docs/week08-api.md`"
        ]
    },
    "week09": {
        "title": "feat(week09): implement custom hooks and refactor (#9)",
        "assignees": "quy, van-anh",
        "desc": "Tự viết các Custom Hooks để đóng gói logic. Áp dụng Debounce giảm tải gọi API.",
        "tasks": [
            "- [ ] **Hooks tối ưu [Quý]**: Viết hooks và gắn vào SearchPage để giảm 500ms delay.",
            "- [ ] **LocalStorage [Văn Anh]**: Giữ danh sách xe yêu thích (thả tim) cục bộ."
        ],
        "files": [
            "  - `src/hooks/useFetch.js`",
            "  - `src/hooks/useDebounce.js`",
            "  - `src/hooks/useLocalStorage.js`",
            "  - `src/pages/SearchPage.jsx`",
            "  - `src/pages/FavoritePage.jsx`"
        ]
    },
    "week10": {
        "title": "feat(week10): deploy, redux, lazy loading, and tailwind migration (#10)",
        "assignees": "sang, tuan",
        "desc": "Quản lý State toàn cục bằng Redux Toolkit; Tối ưu tải bằng Lazy Loading; Trải nghiệm giao diện Tailwind CSS; Deploy Vercel.",
        "tasks": [
            "- [ ] **Redux Toolkit [Sang]**: Thay thế CarContext bằng Redux Slice.",
            "- [ ] **Tailwind & Lazy [Tuân]**: Trì hoãn tải file JS, áp dụng vài utility Tailwind.",
            "- [ ] **Deploy Vercel [Tuân]**: Đưa hệ thống lên môi trường live production."
        ],
        "files": [
            "  - `src/store/store.js`",
            "  - `src/store/slices/carSlice.js`",
            "  - `src/App.jsx`",
            "  - `tailwind.config.js`",
            "  - `vercel.json`"
        ]
    }
}

for week, data in issues.items():
    content = f'''---
name: "📝 Triển khai TODO (Chuẩn Conventional)"
about: "Tạo Issue từ TODO trong README.md với tiêu đề chuẩn Commit Message Convention."
title: "{data['title']}"
labels: ["enhancement", "todo"]
assignees: "{data['assignees']}"
---

## 1. Mô tả tính năng
> {data['desc']}

* **Loại tác vụ (Commit Type):** `feat` (Tính năng mới)
* **Phạm vi ảnh hưởng (Scope):** `{week}`
* **TODO gốc trong README.md:** > ## TUẦN {int(week[-2:])}

---

## 2. Yêu cầu chi tiết
> Chi tiết các file và logic nghiệp vụ cần triển khai theo từng module.

* **Mô tả logic:**
'''
    for task in data['tasks']:
        content += f'    {task}\n'

    content += '''
* **Các file/module dự kiến chỉnh sửa:**
'''
    for file in data['files']:
        content += f'{file}\n'

    content += f'''
---

## 3. Tiêu chí hoàn thành (Definition of Done)
> Các điều kiện bắt buộc phải thỏa mãn để đóng Issue này.

- [ ] Tính năng hoạt động đúng yêu cầu kỹ thuật.
- [ ] **Đã xóa hoặc cập nhật dòng TODO tương ứng trong file `TODO.md` / `README.md`.**
- [ ] Pull Request giải quyết Issue này phải đặt tên theo chuẩn: `{data['title']}`

---

## 4. Thông tin quản lý
> Phần dành cho Project Manager / Tech Lead để điều phối.
* **Độ ưu tiên (Priority):** 🔴 High
* **Ước lượng thời gian (Estimation):** 8 Giờ
* **Người kiểm thử / Reviewer:** Cả nhóm
'''
    with open(f"docs/issues/issue-{week}.md", "w", encoding="utf-8") as f:
        f.write(content)

print("Done generating fully conformant files.")
