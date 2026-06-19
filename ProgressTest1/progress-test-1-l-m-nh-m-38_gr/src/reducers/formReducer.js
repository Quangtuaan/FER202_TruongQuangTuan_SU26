/**
 * formReducer.js – Reducer quản lý form đăng ký (Bài 3)
 *
 * Import: import { validateField } from '../utils/validators'
 *
 * TODO 1: Khai báo initialState
 *         {
 *           values:  { fullName: '', email: '', password: '', confirmPassword: '' },
 *           errors:  { fullName: '', email: '', password: '', confirmPassword: '' },
 *           touched: { fullName: false, email: false, password: false, confirmPassword: false },
 *           status: 'idle'   // 'idle' | 'submitting' | 'success' | 'error'
 *         }
 *
 * TODO 2: Viết formReducer(state, action) xử lý 4 action:
 *
 *   'CHANGE' – { field, value }
 *     → Cập nhật values[field]
 *     → Nếu touched[field] === true: validate lại field đó
 *     → Nếu field === 'password' và touched.confirmPassword: validate lại confirmPassword
 *
 *   'BLUR' – { field }
 *     → Đánh dấu touched[field] = true
 *     → Validate field đó và cập nhật errors[field]
 *
 *   'VALIDATE_ALL'
 *     → Validate tất cả fields, cập nhật errors và touched
 *     → Nếu có lỗi: status = 'error'
 *
 *   'SET_STATUS' – { status }
 *     → Cập nhật status
 *
 *   'RESET'
 *     → Trả về initialState
 *
 * Export: formReducer (default hoặc named), initialState
 */
