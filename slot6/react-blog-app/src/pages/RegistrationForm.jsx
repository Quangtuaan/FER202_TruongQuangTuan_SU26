import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import MyModal from '../components/MyModal';

function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Vui lòng nhập username';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email không đúng định dạng';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập password';
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

      if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          'Password phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng nhập lại password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Confirm password không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    setErrors({});
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/home');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #0d6efd 0%, #6610f2 50%, #6f42c1 100%)',
        display: 'flex',
        alignItems: 'center',
        padding: '40px 0',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            <Card
              className="border-0 shadow-lg"
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
              }}
            >
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: '#e7f1ff',
                      color: '#0d6efd',
                      fontSize: 34,
                    }}
                  >
                    📝
                  </div>

                  <h2 className="fw-bold mb-1">Create Account</h2>

                  <p className="text-muted mb-0">
                    Đăng ký để truy cập React Blog
                  </p>
                </div>

                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Username</Form.Label>

                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Nhập username"
                      isInvalid={!!errors.username}
                      style={{
                        borderRadius: '12px',
                        padding: '12px 14px',
                      }}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email</Form.Label>

                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      isInvalid={!!errors.email}
                      style={{
                        borderRadius: '12px',
                        padding: '12px 14px',
                      }}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>

                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Ví dụ: Abc@123"
                      isInvalid={!!errors.password}
                      style={{
                        borderRadius: '12px',
                        padding: '12px 14px',
                      }}
                    />

                    <Form.Text className="text-muted">
                      Tối thiểu 6 ký tự, có hoa, thường, số và ký tự đặc biệt.
                    </Form.Text>

                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      Confirm Password
                    </Form.Label>

                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Nhập lại password"
                      isInvalid={!!errors.confirmPassword}
                      style={{
                        borderRadius: '12px',
                        padding: '12px 14px',
                      }}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      className="fw-semibold"
                      style={{
                        borderRadius: '12px',
                        padding: '12px',
                      }}
                    >
                      Register
                    </Button>

                    <Button
                      variant="outline-secondary"
                      type="button"
                      size="lg"
                      onClick={handleCancel}
                      style={{
                        borderRadius: '12px',
                        padding: '12px',
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <p className="text-center text-white mt-4 mb-0">
              React Blog App · FER202
            </p>
          </Col>
        </Row>
      </Container>

      <MyModal
        show={showModal}
        handleClose={handleCloseModal}
        title="Đăng ký thành công"
        message="Tài khoản của bạn đã được đăng ký thành công!"
      />
    </div>
  );
}

export default RegistrationForm;