/**
 * ThemedCard.jsx – Card tái sử dụng áp dụng màu từ context (Bài 4)
 *
 * Props nhận vào:
 *   - title    : string (optional) – tiêu đề card
 *   - children : ReactNode         – nội dung bên trong
 *
 * TODO: Dùng useTheme() từ ThemeContext để lấy colors.
 *       Áp dụng colors.surface, colors.border lên style của card.
 *       KHÔNG nhận màu sắc qua props.
 */
export default function ThemedCard({ title, children }) {
  return <div>TODO: card với màu từ context – {title}</div>
}
