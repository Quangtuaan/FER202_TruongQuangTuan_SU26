import React from 'react';
import { Card } from 'react-bootstrap';
import './BrandCard.css';

function BrandCard({ brand }) {
  if (!brand) return null;

  return (
    <Card className="brand-card h-100 text-center rounded-0">
      <Card.Body className="d-flex flex-column justify-content-center align-items-center p-3">
        <Card.Title className="brand-name">{brand.name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default BrandCard;
