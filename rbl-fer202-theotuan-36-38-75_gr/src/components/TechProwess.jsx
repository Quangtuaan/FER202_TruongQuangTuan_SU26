import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './TechProwess.css';

const TechProwess = ({ specs }) => {
  if (!specs) return null;

  const prowessData = [
    { title: 'ENGINE', value: specs.engineType || 'N/A' },
    { title: 'MAX POWER', value: specs.horsepower ? `${specs.horsepower} HP` : 'N/A' },
    { title: 'MAX TORQUE', value: specs.torque ? `${specs.torque} NM` : 'N/A' },
    { title: '0-100 KM/H', value: specs.acceleration0to100 ? `${specs.acceleration0to100}S` : 'N/A' },
    { title: 'TOP SPEED', value: specs.topSpeedKmh ? `${specs.topSpeedKmh} KM/H` : 'N/A' }
  ];

  return (
    <section className="tech-prowess-section">
      <Container>
        <h2 className="tech-prowess-title fst-italic fw-bold text-white mb-4 reveal-el">TECHNICAL PROWESS</h2>
        <Row className="tech-prowess-grid g-0">
          {prowessData.map((item, index) => (
            <Col key={index} xs={12} sm={6} lg={true} className={`tech-prowess-col border-end border-secondary p-4 reveal-el delay-${(index + 1) * 100}`}>
              <div className="prowess-item d-flex flex-column align-items-center justify-content-center text-center">
                <span className="prowess-label text-uppercase mb-2 text-white-50" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>
                  {item.title}
                </span>
                <span className="prowess-value text-white fs-4" style={{ fontFamily: 'monospace' }}>
                  {item.value}
                </span>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TechProwess;
