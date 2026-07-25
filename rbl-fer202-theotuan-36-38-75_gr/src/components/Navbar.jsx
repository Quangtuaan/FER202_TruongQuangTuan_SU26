import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Form, Button, Offcanvas, Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCar } from '../context/CarContext';
import './Navbar.css';

const AtelierNavbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchVal, setSearchVal] = useState('');
  const { user, logout } = useAuth();
  const { favorites } = useCar();

  // Sync search input with URL query param
  useEffect(() => {
    setSearchVal(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/cars?search=${encodeURIComponent(searchVal.trim())}`);
    } else {
      navigate('/cars');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" fixed="top" className="atelier-navbar" variant="dark">
      <Container className="navbar-container" style={{ maxWidth: '1400px' }}>
        <Navbar.Brand as={Link} to="/" className="navbar-logo">
          ATELIER<span>.</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
          className="bg-dark text-white"
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
              ATELIER.
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="mx-auto navbar-menu">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/cars">Cars</Nav.Link>
              <Nav.Link as={Link} to="/brands">Brands</Nav.Link>
              <Nav.Link as={Link} to="/news">News</Nav.Link>
              <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              <Nav.Link as={Link} to="/search">Search</Nav.Link>
              
              {/* Responsive Mobile-Only Nav Links */}
              {user && (
                <Nav.Link as={Link} to="/favorites" className="d-lg-none">
                  Favorites ({favorites.length})
                </Nav.Link>
              )}
              {user && user.role === 'admin' && (
                <Nav.Link as={Link} to="/admin" className="d-lg-none">
                  Admin Dashboard
                </Nav.Link>
              )}
              {user ? (
                <Nav.Link onClick={handleLogout} className="d-lg-none text-gold">
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login" className="d-lg-none">
                  Login
                </Nav.Link>
              )}
            </Nav>

            <div className="navbar-actions d-none d-lg-flex align-items-center">
              <Form className="d-flex search-bar" onSubmit={handleSearchSubmit}>
                <Form.Control
                  type="search"
                  placeholder="SEARCH SUPERCARS..."
                  className="search-input"
                  aria-label="Search"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                />
              </Form>

              {user && (
                <Link to="/favorites" className="nav-fav-icon-wrapper">
                  <i className="bi bi-heart-fill fav-heart-icon"></i>
                  {favorites.length > 0 && (
                    <span className="fav-badge-count">{favorites.length}</span>
                  )}
                </Link>
              )}

              {user ? (
                <Dropdown align="end" className="navbar-user-dropdown">
                  <Dropdown.Toggle as="div" className="avatar-toggle">
                    <img src={user.avatarUrl} alt={user.fullName} className="user-avatar" />
                    <span className="user-name-label">{user.fullName.split(' ').pop()}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="luxury-glass dropdown-menu-dark">
                    <Dropdown.Header className="text-gold">Account</Dropdown.Header>
                    <Dropdown.Item as={Link} to="/favorites" className="dropdown-link">
                      Favorites ({favorites.length})
                    </Dropdown.Item>
                    {user.role === 'admin' && (
                      <Dropdown.Item as={Link} to="/admin" className="dropdown-link">
                        Admin Dashboard
                      </Dropdown.Item>
                    )}
                    <Dropdown.Divider style={{ borderColor: 'var(--glass-border)' }} />
                    <Dropdown.Item onClick={handleLogout} className="dropdown-link logout-item">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button as={Link} to="/login" className="login-btn btn-gold-shimmer">
                  Login
                </Button>
              )}
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default AtelierNavbar;
