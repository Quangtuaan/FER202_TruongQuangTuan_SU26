/**
 * ThemedButton.jsx – Nút bấm áp dụng màu từ context (Bài 4)
 *
 * Props nhận vào:
 *   - children : ReactNode               – nội dung nút
 *   - onClick  : function (optional)
 *   - variant  : 'primary' | 'outline'   – mặc định 'primary'
 *
 * TODO: Dùng useTheme() từ ThemeContext để lấy colors.
 *       variant='primary'  → background = colors.primary, color = colors.primaryText
 *       variant='outline'  → background = transparent,    color = colors.primary
 *       KHÔNG nhận màu sắc qua props.
 */
export default function ThemedButton({ children, onClick, variant = 'primary' }) {
  return <button onClick={onClick}>TODO: {children}</button>
}
