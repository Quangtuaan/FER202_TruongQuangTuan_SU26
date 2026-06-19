/**
 * FormContext.jsx – Context quản lý form đăng ký (Bài 3)
 *
 * Import: import { formReducer, initialState } from '../reducers/formReducer'
 *
 * TODO 1: Tạo FormContext bằng createContext()
 *
 * TODO 2: Tạo FormProvider component
 *         - Dùng useReducer(formReducer, initialState)
 *         - Truyền { state, dispatch } vào value của Provider
 *         - Bọc children bên trong Provider
 *
 * TODO 3: Tạo custom hook useFormContext()
 *         - Gọi useContext(FormContext)
 *         - Ném lỗi nếu context là null
 *
 * Export: FormProvider, useFormContext
 */
