import { useState } from 'react'
import { Form, Button, Alert, Toast, ToastContainer } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

export default function ChangePasswordPage() {
  const { state, dispatch } = useAuth()
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (currentPass !== state.user.password) {
      setError('Mật khẩu hiện tại không đúng')
      return
    }
    if (newPass.length < 6) {
      setError('Mật khẩu mới phải từ 6 ký tự trở lên')
      return
    }
    if (newPass !== confirmPass) {
      setError('Hai mật khẩu không khớp')
      return
    }
    
    dispatch({ type: 'CHANGE_PASSWORD', payload: newPass })
    setShowToast(true)
    setCurrentPass('')
    setNewPass('')
    setConfirmPass('')
  }

  return (
    <div className="mt-4" style={{ maxWidth: '400px' }}>
      <h2>Đổi mật khẩu</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu hiện tại</Form.Label>
          <Form.Control type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu mới</Form.Label>
          <Form.Control type="password" value={newPass} onChange={e => setNewPass(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Xác nhận mật khẩu mới</Form.Label>
          <Form.Control type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Đổi mật khẩu</Button>
      </Form>
      
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="success">
          <Toast.Body className="text-white">Đổi mật khẩu thành công!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}
