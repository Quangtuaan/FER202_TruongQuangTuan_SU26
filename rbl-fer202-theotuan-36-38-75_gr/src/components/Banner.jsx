import React from 'react';
import { Container, Row, Col, Button, Stack, Carousel } from 'react-bootstrap';
import './Banner.css';

function Banner({ cars }) {
  if (!cars || cars.length === 0) {
    return null;
  }

  return (
    <Carousel fade controls={false} indicators={true} interval={5000} className="banner-carousel">
      {cars.map((car, index) => (
        <Carousel.Item key={index}>
          <div 
            className="banner-wrapper"
            style={index !== 0 ? { backgroundImage: `url(${car.image || car.imageUrl})` } : {}}
          >
            {index === 0 && (
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                  pointerEvents: 'none'
                }}
              >
                <source src="/cars/15f48ca74a82ffeae13ed89fd609cafb.mp4" type="video/mp4" />
              </video>
            )}
            <div className="banner-overlay" style={{ zIndex: 1 }}>
              <Container className="h-100 position-relative">
                <Row className="h-100 align-items-end pb-5">
                  <Col md={10} lg={8}>
                    <h1 className="banner-title reveal-el">DRIVE THE EXTRAORDINARY</h1>
                    <p className="banner-subtitle reveal-el delay-100">
                      {car.name} - Technical perfection meets raw visceral power in our midnight atelier.
                    </p>
                    <Stack direction="horizontal" gap={3} className="reveal-el delay-200">
                      <Button variant="light" size="lg" className="banner-btn-primary rounded-0">
                        EXPLORE CARS
                      </Button>
                      <Button variant="outline-light" size="lg" className="banner-btn-secondary rounded-0">
                        VIEW {car.brand}
                      </Button>
                    </Stack>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Banner;
