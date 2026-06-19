import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Navbar className="app-header">
      <Container>
        <Navbar.Brand className="d-flex align-items-center gap-2 m-0">
          <img
            src="/images/image.jpg"
            alt="Course Management Logo"
            className="brand-logo"
          />
          <span className="brand-title">Course Management System</span>
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          {user && (
            <>
              <Navbar.Text className="me-3 small text-muted">
                Signed in as <strong className="text-dark">{user.fullName}</strong>
              </Navbar.Text>

              <Button
                variant="outline-danger"
                size="sm"
                className="action-btn"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header