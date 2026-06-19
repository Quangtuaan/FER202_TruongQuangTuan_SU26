/**
 * validators.js – Hàm validate cho từng field của form đăng ký (Bài 3)
 *
 * TODO: Hoàn thiện logic validate cho từng field theo yêu cầu bên dưới.
 *
 * Quy tắc:
 *  - fullName : không trống, ít nhất 3 ký tự
 *  - email    : không trống, đúng định dạng email
 *  - password : không trống, ≥ 6 ký tự, có ít nhất 1 chữ hoa, 1 chữ số
 *  - confirmPassword : không trống, phải khớp với password
 *
 * @param {string} name       - tên field
 * @param {string} value      - giá trị hiện tại của field
 * @param {object} allValues  - toàn bộ values của form (dùng cho confirmPassword)
 * @returns {string}          - thông báo lỗi, hoặc '' nếu hợp lệ
 */
export function validateField(name, value, allValues = {}) {
  switch (name) {
    case 'fullName':
      // TODO: kiểm tra không trống và độ dài >= 3
      return ''

    case 'email':
      // TODO: kiểm tra không trống và đúng định dạng email
      return ''

    case 'password':
      // TODO: kiểm tra không trống, length >= 6, có chữ hoa, có chữ số
      return ''

    case 'confirmPassword':
      // TODO: kiểm tra không trống và khớp với allValues.password
      return ''

    default:
      return ''
  }
}
