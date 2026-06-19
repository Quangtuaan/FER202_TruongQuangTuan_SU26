/**
 * ThemedInput.jsx – Input áp dụng màu từ context (Bài 4)
 *
 * Props nhận vào:
 *   - placeholder : string (optional)
 *
 * TODO: Dùng useTheme() từ ThemeContext để lấy colors.
 *       Áp dụng colors.background, colors.border, colors.text lên input.
 *       KHÔNG nhận màu sắc qua props.
 */
export default function ThemedInput({ placeholder }) {
  return <input placeholder={placeholder} />
}
