import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ thông tin đăng nhập.');
      return;
    }

    try {
      await login(username.trim(), password);
      // Determine redirect path
      if (username.toLowerCase() === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Đăng nhập thất bại.');
    }
  };

  return (
    <div className="login-page-container">
      <Container className="d-flex justify-content-center">
        <div className="login-card luxury-glass">
          <div className="login-header">
            <h2>ATELIER<span>.</span></h2>
            <p>Đăng nhập cổng thông tin siêu xe thượng lưu</p>
          </div>

          {errorMsg && (
            <div className="login-error-alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {errorMsg}
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="login-form-group" controlId="formUsername">
              <Form.Label className="login-form-label">Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên đăng nhập (ví dụ: admin, user01)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
                autoComplete="username"
              />
            </Form.Group>

            <Form.Group className="login-form-group" controlId="formPassword">
              <Form.Label className="login-form-label">Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                autoComplete="current-password"
              />
            </Form.Group>

            <Button 
              type="submit" 
              className="login-submit-btn btn-gold-shimmer"
            >
              ĐĂNG NHẬP
            </Button>
          </Form>

          <div className="login-footer">
            <span>Chưa có tài khoản?</span>
            <Link to="/register">Đăng ký ngay</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
