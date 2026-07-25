import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css'; // Reuse Login styling for consistency

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !email.trim() || !fullName.trim() || !password || !confirmPassword) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin đăng ký.');
      return;
    }

    if (username.trim().length < 3) {
      setErrorMsg('Tên đăng nhập phải chứa ít nhất 3 ký tự.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Mật khẩu phải chứa ít nhất 6 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu nhập lại không khớp.');
      return;
    }

    try {
      await register(username.trim(), email.trim(), password, fullName.trim());
      navigate('/');
    } catch (err) {
      setErrorMsg(err.message || 'Đăng ký thất bại.');
    }
  };

  return (
    <div className="login-page-container">
      <Container className="d-flex justify-content-center">
        <div className="login-card luxury-glass" style={{ maxWidth: '480px' }}>
          <div className="login-header">
            <h2>ATELIER<span>.</span></h2>
            <p>Khởi tạo tài khoản trải nghiệm siêu xe</p>
          </div>

          {errorMsg && (
            <div className="login-error-alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {errorMsg}
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="login-form-group" controlId="formFullName">
              <Form.Label className="login-form-label">Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên của bạn"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="login-input"
              />
            </Form.Group>

            <Form.Group className="login-form-group" controlId="formEmail">
              <Form.Label className="login-form-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
            </Form.Group>

            <Form.Group className="login-form-group" controlId="formUsername">
              <Form.Label className="login-form-label">Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên đăng nhập viết liền"
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
                placeholder="Tối thiểu 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                autoComplete="new-password"
              />
            </Form.Group>

            <Form.Group className="login-form-group" controlId="formConfirmPassword">
              <Form.Label className="login-form-label">Nhập lại mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="login-input"
                autoComplete="new-password"
              />
            </Form.Group>

            <Button 
              type="submit" 
              className="login-submit-btn btn-gold-shimmer"
            >
              ĐĂNG KÝ NGAY
            </Button>
          </Form>

          <div className="login-footer">
            <span>Đã có tài khoản?</span>
            <Link to="/login">Đăng nhập</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
