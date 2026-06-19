/**
 * FormField.jsx – Input field tái sử dụng cho form đăng ký (Bài 3)
 *
 * Props nhận vào:
 *   - name        : string  – tên field (khớp với key trong state.values)
 *   - label       : string  – nhãn hiển thị
 *   - type        : string  – loại input ('text' | 'email' | 'password'), mặc định 'text'
 *   - placeholder : string  – placeholder text
 *
 * TODO: Dùng useFormContext() từ FormContext để lấy state và dispatch.
 *       Đọc: state.values[name], state.errors[name], state.touched[name]
 *
 *       Khi onChange: dispatch action CHANGE với { field: name, value }
 *       Khi onBlur:   dispatch action BLUR  với { field: name }
 *
 *       Hiển thị thông báo lỗi CHỈ KHI field đã được touched VÀ có lỗi.
 *       Đổi màu viền input theo trạng thái: lỗi (đỏ) / hợp lệ (xanh) / mặc định.
 */
export default function FormField({ name, label, type = 'text', placeholder }) {
  return <div>TODO: input field cho {name}</div>
}
