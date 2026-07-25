import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="atelier-footer">
      <Container style={{ maxWidth: '1400px' }}>
        <Row className="gy-4 mb-4">
          <Col lg={5} md={12} className="footer-brand">
            <h2 className="footer-logo">ATELIER<span>.</span></h2>
            <p>Vietnam's premier supercar showroom. The gathering place of mechanical masterpieces and ultimate luxury.</p>
          </Col>
          <Col lg={3} md={6} className="footer-links">
            <h3>Links</h3>
            <ul className="list-unstyled">
              <li><a href="/about">About Us</a></li>
              <li><a href="/cars">Showroom</a></li>
              <li><a href="/brands">Brands</a></li>
              <li><a href="/news">News</a></li>
            </ul>
          </Col>
          <Col lg={4} md={6} className="footer-contact">
            <h3>Contact Info</h3>
            <p>📍 123 Velocity Avenue, District 1, HCMC</p>
            <p>📞 +84 987 654 321</p>
            <p>✉️ contact@atelier.vn</p>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container style={{ maxWidth: '1400px' }}>
          <p className="mb-0 text-center">&copy; {new Date().getFullYear()} ATELIER Supercar Showroom. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
