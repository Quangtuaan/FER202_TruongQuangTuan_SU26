import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ShowroomIntro.css';

function ShowroomIntro() {
  return (
    <section className="showroom-intro-section py-5">
      <Container>
        <Row className="align-items-center gy-5">
          <Col lg={6} className="reveal-el">
            <span className="section-subtitle text-start mb-2">The Sanctuary of Speed</span>
            <h2 className="showroom-title mb-4">THE ATELIER GALLERY</h2>
            
            <p className="showroom-desc mb-4">
              Founded on a passion for engineering purity and aerodynamic art, ATELIER is more than a showroom—it is a sanctuary for the world’s most exclusive mechanical masterpieces. 
            </p>
            <p className="showroom-desc mb-5">
              We curate only the rarest hypercars and limited-edition supercars, ensuring that each vehicle in our collection represents the absolute zenith of automotive performance, heritage, and luxury design.
            </p>

            <Row className="g-4">
              <Col xs={6}>
                <div className="stat-box">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Years of Heritage</div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="stat-box">
                  <div className="stat-number">250+</div>
                  <div className="stat-label">Masterpieces Delivered</div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="stat-box">
                  <div className="stat-number">6</div>
                  <div className="stat-label">Exclusive Brand Partners</div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="stat-box">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Bespoke VIP Service</div>
                </div>
              </Col>
            </Row>
          </Col>

          <Col lg={6} className="reveal-el delay-200">
            <div className="showroom-img-frame">
              <div className="showroom-glow" />
              <img 
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80" 
                alt="ATELIER Luxury Showroom" 
                className="showroom-img"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ShowroomIntro;
