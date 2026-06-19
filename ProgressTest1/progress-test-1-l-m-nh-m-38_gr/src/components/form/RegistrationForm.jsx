/**
 * RegistrationForm.jsx – Form đăng ký với validation (Bài 3)
 *
 * TODO: Dùng useFormContext() từ FormContext để lấy state và dispatch.
 *
 *       Render 4 FormField:
 *         - fullName        label="Họ và tên"
 *         - email           label="Email"           type="email"
 *         - password        label="Mật khẩu"        type="password"
 *         - confirmPassword label="Xác nhận mật khẩu" type="password"
 *
 *       Khi submit (handleSubmit):
 *         1. Dispatch VALIDATE_ALL để hiện toàn bộ lỗi
 *         2. Kiểm tra xem còn lỗi không – nếu có thì return sớm
 *         3. Dispatch SET_STATUS 'submitting'
 *         4. Giả lập API call (setTimeout 1000ms)
 *         5. Dispatch SET_STATUS 'success'
 *
 *       Khi status === 'success': hiển thị thông báo thành công và nút "Đăng ký lại"
 *         - Nút "Đăng ký lại": dispatch RESET
 *
 *       Khi status === 'error': hiển thị banner lỗi phía trên nút submit.
 *
 *       Nút submit: disabled khi status === 'submitting'.
 */
export default function RegistrationForm() {
  return <div>TODO: form đăng ký với 4 FormField</div>
}
