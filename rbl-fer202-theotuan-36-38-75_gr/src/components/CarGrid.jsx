import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Stack } from 'react-bootstrap';
import CarCard from './CarCard';
import './CarGrid.css';

function CarGrid({ cars = [], onSelectCar }) {
  if (!cars || cars.length === 0) {
    return (
      <Container className="py-4">
        <p className="text-center text-muted">Không có xe để hiển thị.</p>
      </Container>
    );
  }

  return (
    <Container className="car-grid-container" style={{ padding: '80px 0' }}>
      <Stack direction="horizontal" className="justify-content-between align-items-end mb-5">
        <div>
          <div className="text-mask-wrapper">
            <p className="car-grid-subtitle mb-2 reveal-el">CURATED</p>
          </div>
          <div className="text-mask-wrapper">
            <h2 className="car-grid-title mb-0 reveal-el delay-100">FEATURED SELECTION</h2>
          </div>
        </div>
        <a href="#" className="car-grid-link d-none d-md-block">
          VIEW ALL MODELS &rarr;
        </a>
      </Stack>
      
      <Row className="g-4">
        {cars.map((car, index) => (
          <Col key={car.id} xs={12} sm={6} md={4} lg={3} className={`reveal-el delay-${(index % 4) * 100 + 200}`}>
            <CarCard car={car} onSelectCar={onSelectCar} />
          </Col>
        ))}
      </Row>
      
      <div className="d-md-none mt-4 text-center">
        <a href="#" className="car-grid-link">
          VIEW ALL MODELS &rarr;
        </a>
      </div>
    </Container>
  );
}

export default CarGrid;
