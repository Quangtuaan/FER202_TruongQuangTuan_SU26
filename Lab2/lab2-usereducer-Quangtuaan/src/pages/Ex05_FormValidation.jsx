/**
 * Bài 5 – Form Validation (useReducer)
 * ======================================
 * Mục tiêu: Quản lý form state phức tạp (values, errors, touched, submitted)
 *           bằng useReducer.
 *
 * Chạy test: npm test -- Ex05
 */
import { useReducer } from 'react'
import { Card, Form, Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

// ─────────────────────────────────────────────
// TODO 1: Định nghĩa initialState
//   {
//     values:    { name: '', email: '', password: '', confirm: '' },
//     errors:    {},      // { fieldName: 'thông báo lỗi' }
//     touched:   {},      // { fieldName: true/false }
//     submitted: false,
//   }
// ─────────────────────────────────────────────
const initialState = {
  values: { name: '', email: '', password: '', confirm: '' },
  errors: {},
  touched: {},
  submitted: false,
} // TODO 1

// ─────────────────────────────────────────────
// TODO 2: Viết hàm validate(values)
//   Trả về object errors (rỗng = hợp lệ).
//   Quy tắc:
//   - name:     không được rỗng + ít nhất 3 kí tự, không chứa số, không kí tự đặc biệt
//   - email:    phải đúng định dạng email
//   - password: ít nhất 6 ký tự + có hoa, thường, số, ký tự đặc biệt
//   - confirm:  phải bằng values.password
// ─────────────────────────────────────────────
function validate(values) {
  const errors = {}

  // name: không được rỗng + ít nhất 3 kí tự, không chứa số, không kí tự đặc biệt
  const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/

  if (!values.name.trim()) {
    errors.name = 'Họ tên không được rỗng'
  } else if (values.name.trim().length < 3) {
    errors.name = 'Họ tên phải có ít nhất 3 ký tự'
  } else if (!nameRegex.test(values.name.trim())) {
    errors.name = 'Họ tên không được chứa số hoặc ký tự đặc biệt'
  }

  // email: phải đúng định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!values.email.trim()) {
    errors.email = 'Email không được rỗng'
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = 'Email không đúng định dạng'
  }

  // password: ít nhất 6 ký tự + có hoa, thường, số, ký tự đặc biệt
  if (values.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = 'Mật khẩu phải có ít nhất 1 chữ hoa'
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = 'Mật khẩu phải có ít nhất 1 chữ thường'
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = 'Mật khẩu phải có ít nhất 1 chữ số'
  } else if (!/[^A-Za-z0-9]/.test(values.password)) {
    errors.password = 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'
  }

  // confirm: phải bằng values.password
  if (values.confirm !== values.password) {
    errors.confirm = 'Xác nhận mật khẩu không khớp'
  }

  return errors
}

// ─────────────────────────────────────────────
// TODO 3: Viết reducer(state, action)
//
//   Case 'SET_FIELD':
//     - action.payload = { field, value }  (field là tên trường, vd 'name')
//     - Cập nhật values[field] = value
//     - Đánh dấu touched[field] = true
//     - Tính lại errors bằng validate() với values MỚI
//
//   Case 'SUBMIT':
//     - Tính lại errors
//     - Đánh dấu tất cả touched = { name: true, email: true, password: true, confirm: true }
//     - submitted = true nếu Object.keys(errors).length === 0
//
//   Case 'RESET':
//     - Trả về initialState
// ─────────────────────────────────────────────
function reducer(state, action) {
  // TODO 3
  switch (action.type) {
    case 'SET_FIELD': {
      const { field, value } = action.payload

      const newValues = {
        ...state.values,
        [field]: value
      }

      return {
        ...state,
        values: newValues,
        touched: {
          ...state.touched,
          [field]: true
        },
        errors: validate(newValues),
        submitted: false
      }
    }

    case 'SUBMIT': {
      const errors = validate(state.values)

      return {
        ...state,
        errors,
        touched: {
          name: true,
          email: true,
          password: true,
          confirm: true
        },
        submitted: Object.keys(errors).length === 0
      }
    }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

export default function Ex05_FormValidation() {
  // TODO 4: Gọi useReducer(reducer, initialState)
  const [state, dispatch] = useReducer(reducer, initialState)
  // TODO 4: thay dòng trên bằng useReducer

  const navigate = useNavigate()

  // Helper: trả về thông báo lỗi nếu field đã được touch
  // TODO 5: Hoàn thiện hàm getError
  function getError(field) {
    return state.touched[field] ? state.errors[field] : undefined
  }

  // ─────────────────────────────────────────────
  // TODO 6: Viết hàm handleChange(e)
  //   - Lấy { name, value } từ e.target
  //   - dispatch({ type: 'SET_FIELD', payload: { field: name, value } })
  // ─────────────────────────────────────────────
  function handleChange(e) {
    // TODO 6
    const { name, value } = e.target

    dispatch({
      type: 'SET_FIELD',
      payload: {
        field: name,
        value
      }
    })
  }

  // ─────────────────────────────────────────────
  // TODO 7: Viết hàm handleSubmit(e)
  //   - e.preventDefault()
  //   - dispatch({ type: 'SUBMIT' })
  // ─────────────────────────────────────────────
  function handleSubmit(e) {
    // TODO 7
    e.preventDefault()

    dispatch({
      type: 'SUBMIT'
    })
  }

  function handleCloseModal() {
    navigate('/home')
  }

  return (
    <>
      <Card className="mx-auto" style={{ maxWidth: 480 }}>
        <Card.Header><strong>Bài 5 – Form Validation</strong></Card.Header>
        <Card.Body>

          {/* TODO 8: Gắn handleSubmit vào onSubmit */}
          <Form onSubmit={handleSubmit} data-testid="register-form" noValidate>

            {/* Trường name */}
            <Form.Group className="mb-3">
              <Form.Label>Họ tên</Form.Label>
              {/* TODO 9: value, name="name", onChange=handleChange */}
              <Form.Control
                data-testid="input-name"
                name="name"
                value={state.values.name}
                onChange={handleChange}
                placeholder="Họ và tên"
                isInvalid={!!getError('name')}
              />
              <Form.Control.Feedback type="invalid" data-testid="error-name">
                {getError('name')}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Trường email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              {/* TODO 10: value, name="email", onChange=handleChange */}
              <Form.Control
                type="email"
                data-testid="input-email"
                name="email"
                value={state.values.email}
                onChange={handleChange}
                placeholder="email@example.com"
                isInvalid={!!getError('email')}
              />
              <Form.Control.Feedback type="invalid" data-testid="error-email">
                {getError('email')}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Trường password */}
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              {/* TODO 11: value, name="password", onChange=handleChange */}
              <Form.Control
                type="password"
                data-testid="input-password"
                name="password"
                value={state.values.password}
                onChange={handleChange}
                placeholder="Tối thiểu 6 ký tự"
                isInvalid={!!getError('password')}
              />
              <Form.Control.Feedback type="invalid" data-testid="error-password">
                {getError('password')}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Trường confirm */}
            <Form.Group className="mb-3">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              {/* TODO 12: value, name="confirm", onChange=handleChange */}
              <Form.Control
                type="password"
                data-testid="input-confirm"
                name="confirm"
                value={state.values.confirm}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                isInvalid={!!getError('confirm')}
              />
              <Form.Control.Feedback type="invalid" data-testid="error-confirm">
                {getError('confirm')}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              {/* TODO 13: Nút submit */}
              <Button type="submit" data-testid="btn-submit">Đăng ký</Button>
              {/* TODO 14: onClick dispatch RESET */}
              <Button
                type="button"
                variant="secondary"
                data-testid="btn-reset"
                onClick={() =>
                  dispatch({
                    type: 'RESET'
                  })
                }
              >
                Reset
              </Button>
            </div>

          </Form>
        </Card.Body>
      </Card>

      <Modal show={state.submitted} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Login thành công
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}