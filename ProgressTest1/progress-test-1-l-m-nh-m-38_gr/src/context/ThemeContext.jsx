/**
 * ThemeContext.jsx – Context quản lý theme (Bài 4)
 *
 * Import: import { themes, STORAGE_KEY } from '../data/themeConfig'
 *
 * TODO 1: Tạo ThemeContext bằng createContext()
 *
 * TODO 2: Tạo ThemeProvider component
 *         State:
 *         - mode : 'light' | 'dark' | 'system'
 *           → Đọc từ localStorage (STORAGE_KEY) khi khởi tạo, mặc định 'system'
 *         - systemPrefersDark : boolean
 *           → Đọc từ window.matchMedia('(prefers-color-scheme: dark)').matches
 *
 *         useEffect: lắng nghe sự thay đổi OS theme (addEventListener 'change')
 *         Nhớ cleanup (removeEventListener) khi component unmount.
 *
 *         resolvedTheme : tính từ mode
 *           → Nếu mode === 'system' → dùng systemPrefersDark ? 'dark' : 'light'
 *           → Ngược lại → dùng mode
 *
 *         colors : themes[resolvedTheme]
 *
 *         changeMode(newMode):
 *           → setMode(newMode)
 *           → Lưu vào localStorage (STORAGE_KEY)
 *
 *         Dùng useMemo cho value để tránh re-render không cần thiết.
 *         Truyền { mode, resolvedTheme, colors, changeMode } vào Provider.
 *
 * TODO 3: Tạo custom hook useTheme()
 *         - Gọi useContext(ThemeContext)
 *         - Ném lỗi nếu context là null
 *
 * Export: ThemeProvider, useTheme
 */
