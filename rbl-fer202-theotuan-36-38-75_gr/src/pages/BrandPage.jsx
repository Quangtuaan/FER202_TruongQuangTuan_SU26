import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import carService from '../services/carService';
import BrandCard from '../components/BrandCard';
import SectionWrapper from '../components/SectionWrapper';

function BrandPage() {
  const { data: brands, loading, error } = useFetch(() => carService.getBrands(), []);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'grid', placeItems: 'center', backgroundColor: '#0b0c10', color: '#fff' }}>
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '80vh', display: 'grid', placeItems: 'center', backgroundColor: '#0b0c10', color: '#fff' }}>
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  const normalizedBrands = (brands || []).map((brand) => ({
    ...brand,
    logo: brand.logoUrl,
  }));

  return (
    <div style={{ backgroundColor: '#0b0c10', minHeight: '100vh', padding: '120px 0 80px' }}>
      <Container>
        <SectionWrapper title="LEGENDARY MANUFACTURERS" subtitle="OFFICIAL BRANDS">
          <Row className="g-4 mt-2">
            {normalizedBrands.map((brand, index) => (
              <Col key={brand.id} xs={12} sm={6} md={4} lg={3} className={`reveal-el delay-${(index % 4) * 100 + 100}`}>
                <Link to={`/cars?search=${encodeURIComponent(brand.name)}`} style={{ textDecoration: 'none' }}>
                  <BrandCard brand={brand} />
                </Link>
              </Col>
            ))}
          </Row>
        </SectionWrapper>
      </Container>
    </div>
  );
}

export default BrandPage;
