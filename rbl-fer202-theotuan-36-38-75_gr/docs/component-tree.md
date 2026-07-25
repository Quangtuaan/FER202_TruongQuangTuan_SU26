# ATELIER — Component Tree & Data Flow Diagram

Sơ đồ mô tả cấu trúc component và luồng dữ liệu của ứng dụng **ATELIER Supercar Showroom**.

---

## 🌳 Component Tree — Toàn bộ cấu trúc

```mermaid
graph TD
    Main["⚡ main.jsx
    ───────────────
    ReactDOM.render
    Bọc Providers"]

    Providers["🌐 Providers
    ───────────────
    AuthProvider
    CarProvider
    BrowserRouter"]

    App["🗂️ App.jsx
    ───────────────
    Cấu hình Routes
    Layout tổng thể"]

    Navbar["🔝 Navbar.jsx
    ─────────────
    Logo + Menu
    Tìm kiếm
    Nút Đăng nhập"]

    Footer["🔚 Footer.jsx
    ─────────────
    Links + Copyright"]

    subgraph Pages["📄 Pages (Routes)"]
        HP["🏠 HomePage"]
        CL["📋 CarListPage"]
        CD["🚗 CarDetailPage"]
        CP["⚖️ ComparePage"]
        BP["🏢 BrandPage"]
        NP["📰 NewsPage"]
        GP["🖼️ GalleryPage"]
        SP["🔍 SearchPage"]
        FP["❤️ FavoritePage"]
        CO["📞 ContactPage"]
        AB["ℹ️ AboutPage"]
        LG["🔐 LoginPage"]
        RG["📝 RegisterPage"]
        AD["⚙️ AdminDashboard"]
    end

    subgraph SharedComponents["🧩 Shared Components"]
        CC["CarCard.jsx"]
        CG["CarGrid.jsx"]
        BC["BrandCard.jsx"]
        CF["CarFilter.jsx"]
        ST["SpecTable.jsx"]
        SW["SectionWrapper.jsx"]
    end

    Main --> Providers
    Providers --> App
    App --> Navbar
    App --> Pages
    App --> Footer

    HP --> SW
    HP --> CG
    HP --> BC
    CL --> CF
    CL --> CG
    CD --> ST
    CP --> ST
    BP --> BC
    FP --> CG
    AD --> CC

    CG --> CC
```

---

## 🔄 Data Flow — Tuần 3 (Props & Callbacks)

```mermaid
graph TD
    App["🗂️ App.jsx
    ─────────────────────────
    CARS[ ] — 12 siêu xe
    BRANDS[ ] — 6 hãng xe
    handleViewDetail()
    handleToggleFavorite()
    handleCompare()
    handleSelectBrand()"]

    HP["📄 HomePage.jsx
    ─────────────────────────
    Props nhận vào:
    • featuredCars[ ]
    • brands[ ]
    • onViewDetail
    • onToggleFavorite"]

    CL["📄 CarListPage.jsx
    ─────────────────────────
    Props nhận vào:
    • cars[ ]
    • brands[ ]
    • filters
    • onViewDetail
    • onCompare"]

    SW["📦 SectionWrapper
    ─────────
    Props: title, subtitle
    children (slot)"]

    CG["📦 CarGrid.jsx
    ─────────────────────────
    Props: cars[ ]
    onViewDetail
    onToggleFavorite"]

    CC["🃏 CarCard.jsx
    ─────────────────────────
    Props: car (object)
    onViewDetail
    onToggleFavorite"]

    BC["🃏 BrandCard.jsx
    ─────────────────────────
    Props: brand (object)
    onSelectBrand"]

    CF["🔽 CarFilter.jsx
    ─────────────────────────
    Props: brands[ ]
    filters (object)
    onFilterChange"]

    ST["📊 SpecTable.jsx
    ─────────────────────────
    Props: car (object)
    Render bảng thông số"]

    %% Props đi xuống
    App -->|"featuredCars, brands
    onViewDetail
    onToggleFavorite"| HP

    App -->|"cars, brands, filters
    onViewDetail
    onCompare"| CL

    HP --> SW
    HP -->|"featuredCars
    onViewDetail
    onToggleFavorite"| CG
    HP -->|"brands
    onSelectBrand"| BC

    CL -->|"brands, filters
    onFilterChange"| CF
    CL -->|"cars
    onViewDetail"| CG

    CG -->|"car (single)
    onViewDetail
    onToggleFavorite"| CC

    %% Callbacks đi lên
    CC -.->|"onViewDetail(car) ↑"| App
    CC -.->|"onToggleFavorite(carId) ↑"| App
    BC -.->|"onSelectBrand(brandId) ↑"| App
    CF -.->|"onFilterChange(key, val) ↑"| CL

    %% Style
    classDef appNode fill:#D4AF37,color:#000,stroke:#b8960c,stroke-width:2px
    classDef pageNode fill:#1a1a2e,color:#fff,stroke:#D4AF37,stroke-width:2px
    classDef compNode fill:#16213e,color:#ccc,stroke:#0f3460,stroke-width:1px
    classDef filterNode fill:#0f3460,color:#fff,stroke:#D4AF37,stroke-width:1px

    class App appNode
    class HP,CL pageNode
    class SW,CG,CC,BC,ST compNode
    class CF filterNode
```

---

## 🌐 Context Flow — Tuần 7 (useContext)

```mermaid
graph TD
    Providers["🌐 Providers (main.jsx)
    ────────────────────────
    AuthProvider
    CarProvider"]

    AuthCtx["🔐 AuthContext
    ────────────────────────
    user (object | null)
    isLoggedIn (bool)
    login(credentials)
    logout()
    register(data)"]

    CarCtx["❤️ CarContext
    ────────────────────────
    favoriteIds[ ]
    toggleFavorite(carId)
    activeFilters (object)
    setFilter(key, val)
    clearFilters()"]

    LG["LoginPage
    useContext(AuthCtx)
    → login()"]

    RG["RegisterPage
    useContext(AuthCtx)
    → register()"]

    Navbar["Navbar
    useContext(AuthCtx)
    → user, logout()"]

    CC["CarCard
    useContext(CarCtx)
    → favoriteIds
    → toggleFavorite()"]

    FP["FavoritePage
    useContext(CarCtx)
    → favoriteIds[ ]"]

    CL["CarListPage
    useContext(CarCtx)
    → activeFilters
    → setFilter()"]

    AD["AdminDashboard
    useContext(AuthCtx)
    → user.role check"]

    Providers --> AuthCtx
    Providers --> CarCtx

    AuthCtx -.->|"useContext"| LG
    AuthCtx -.->|"useContext"| RG
    AuthCtx -.->|"useContext"| Navbar
    AuthCtx -.->|"useContext"| AD

    CarCtx -.->|"useContext"| CC
    CarCtx -.->|"useContext"| FP
    CarCtx -.->|"useContext"| CL

    classDef providerNode fill:#D4AF37,color:#000,stroke:#b8960c,stroke-width:2px
    classDef ctxNode fill:#1a1a2e,color:#D4AF37,stroke:#D4AF37,stroke-width:2px
    classDef consumerNode fill:#16213e,color:#fff,stroke:#0f3460,stroke-width:1px

    class Providers providerNode
    class AuthCtx,CarCtx ctxNode
    class LG,RG,Navbar,CC,FP,CL,AD consumerNode
```

---

## 📡 API Service Flow — Tuần 8 (Axios)

```mermaid
graph LR
    subgraph Frontend
        Pages["Pages / Components"]
        Services["📡 Services Layer
        ────────────────
        carService.js
        brandService.js
        newsService.js
        contactService.js
        userService.js"]
        Axios["⚙️ Axios Instance
        ────────────────
        baseURL: localhost:3001
        timeout: 5000"]
    end

    subgraph Backend
        JSONServer["🗄️ JSON-Server
        ────────────────
        PORT: 3001
        db.json"]
        Endpoints["📌 Endpoints
        GET /cars
        GET /cars/:id
        POST /cars
        PUT /cars/:id
        DELETE /cars/:id
        GET /brands
        GET /news
        POST /contacts
        GET /users"]
    end

    Pages -->|"gọi hàm"| Services
    Services -->|"axios.get/post/put/delete"| Axios
    Axios -->|"HTTP Request"| JSONServer
    JSONServer --> Endpoints
    Endpoints -->|"JSON Response"| Axios
    Axios -->|"data / error"| Services
    Services -->|"return data"| Pages
```

---

## Nguyên tắc cốt lõi

| Hướng | Cơ chế | Ví dụ |
|-------|--------|-------|
| **Dữ liệu đi xuống** | Props | `App → CarListPage → CarGrid → CarCard` |
| **Sự kiện đi lên** | Callback | `CarCard → onToggleFavorite(carId) → App` |
| **State toàn cục** | Context | `CarContext → favoriteIds → CarCard, FavoritePage` |
| **Dữ liệu từ API** | Axios + Service | `carService.getCars() → JSON-Server → CarListPage` |

- **App** là nguồn sự thật (**single source of truth**) ở Tuần 3–4
- **Context** thay thế props drilling từ Tuần 7 trở đi
- **Service Layer** tách biệt logic API khỏi UI từ Tuần 8

---

## Cách export sang PNG

### Cách 1 — Mermaid Live Editor (dễ nhất)
1. Truy cập **https://mermaid.live**
2. Copy từng khối `mermaid` ở trên, dán vào editor
3. Click nút **PNG** ở góc trên bên phải để tải xuống
4. Lưu vào thư mục `docs/`

### Cách 2 — CLI (mmdc)
```bash
# Cài đặt một lần
npm install -g @mermaid-js/mermaid-cli

# Export PNG với nền tối
mmdc -i docs/component-tree.md -o docs/component-tree.png -t dark -b "#0d0d0d"
```
