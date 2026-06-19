import { useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { findUser } from '../utils/authHelpers'

export default function LoginForm() {
  const { state, dispatch } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = findUser(username, password)
    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Tài khoản hoặc mật khẩu không đúng' })
    }
  }

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: '400px' }}>
      <Card.Header className="bg-primary text-white">
        <h4>Đăng nhập</h4>
      </Card.Header>
      <Card.Body>
        {state.error && <Alert variant="danger">{state.error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Đăng nhập
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="text-muted text-center">
        Nhập thông tin tài khoản
      </Card.Footer>
    </Card>
  )
}