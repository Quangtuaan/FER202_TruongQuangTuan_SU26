import { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(username, password);

    if (success) {
      navigate('/users');
    }
  };

  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Card style={{ width: '420px' }} className="shadow">
        <Card.Body>
          <h3 className="text-center mb-4">User Manager Login</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                value={username}
                placeholder="admin"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="123456"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </Form>

          <div className="mt-4 small text-muted">
            <div>
              <strong>Tài khoản mẫu:</strong>
            </div>
            <div>admin / 123456</div>
            <div>manager / 123456</div>
            <div>user1 / 123456</div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;