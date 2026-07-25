# ATELIER — Style Guide & Design System

## 🎨 Bảng màu (Color Palette)

| Tên | Hex | Sử dụng |
|-----|-----|---------|
| **Background** | `#0d0d0d` | Nền trang chính |
| **Surface** | `#1a1a1a` | Card, panel, modal |
| **Surface 2** | `#222222` | Hover state, nested card |
| **Gold** | `#D4AF37` | Màu chủ đạo — accent, CTA, border |
| **Gold Light** | `#e8c84a` | Hover của gold |
| **Text** | `#f5f5f5` | Văn bản chính |
| **Text Muted** | `#888888` | Phụ đề, label |
| **Border** | `rgba(255,255,255,0.08)` | Viền subtle |
| **White** | `#ffffff` | Tiêu đề lớn |

---

## 🔤 Typography

| Vai trò | Font | Weight | Dùng cho |
|---------|------|--------|----------|
| **Heading** | `Anybody` | 700, 800 | Tên xe, tiêu đề trang, banner |
| **Body** | `Space Grotesk` | 300, 400, 500, 600 | Nội dung, nút, label |

```css
/* Import */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Anybody:wght@400;700;800&display=swap');
```

---

## 📐 Spacing System

| Token | Value | Dùng cho |
|-------|-------|---------|
| `--navbar-height` | `72px` | Chiều cao Navbar cố định |
| Section padding | `80px 0` | Padding trên/dưới mỗi section |
| Card padding | `24px` | Padding bên trong card |
| Grid gap | `24px` | Khoảng cách giữa các card |

---

## 🪟 Glass Effect

```css
.glass {
  background: rgba(26, 26, 26, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## 🎴 Component Patterns

### CarCard
- Kích thước ảnh: `aspect-ratio: 16/9`
- Hover: `transform: translateY(-4px)` + `box-shadow: 0 8px 32px rgba(212,175,55,0.15)`
- Badge hãng xe: background gold, text black

### Navbar
- Height: `72px`, position: `fixed top-0`
- Background: `glass` effect
- Active link: underline màu gold

### Button Primary
```css
background: var(--color-gold);
color: #000;
border: none;
padding: 12px 28px;
font-weight: 600;
letter-spacing: 0.05em;
transition: background 0.2s;
```

---

## 📱 Breakpoints (Bootstrap)

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| `xs` | < 576px | 1 cột, menu hamburger |
| `sm` | ≥ 576px | 2 cột |
| `md` | ≥ 768px | 3 cột |
| `lg` | ≥ 992px | 4 cột |
| `xl` | ≥ 1200px | 4 cột + sidebar filter |

---

## 🖼️ Mockup Screens

Xem ảnh mockup từng trang tại `docs/mockup/`:

| Thư mục | Trang |
|---------|-------|
| `HomePage/` | Trang chủ |
| `CarListPage/` | Danh sách xe |
| `CarDetailPage/` | Chi tiết xe |
| `ComparePage/` | So sánh xe |
| `BrandPage/` | Hãng xe |
| `NewsPage/` | Tin tức |
| `GalleryPage/` | Thư viện ảnh |
| `LoginPage/` | Đăng nhập |
| `RegisterPage/` | Đăng ký |
| `FavoritePage/` | Xe yêu thích |
| `ContactPage/` | Liên hệ |
| `AboutPage/` | Giới thiệu |
| `SearchPage/` | Tìm kiếm |
| `AdminDashboard/` | Quản trị |
| `StyleGuide_DarkTheme/` | Theme tối tham khảo |
