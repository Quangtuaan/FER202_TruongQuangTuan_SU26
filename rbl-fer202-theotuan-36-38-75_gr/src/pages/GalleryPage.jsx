import React from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import SectionWrapper from '../components/SectionWrapper';

function GalleryPage() {
  const { data: photos, loading, error } = useFetch('/gallery', []);

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

  return (
    <div style={{ backgroundColor: '#0b0c10', minHeight: '100vh', padding: '120px 0 80px' }}>
      <Container>
        <SectionWrapper title="MIDNIGHT SHOWROOM" subtitle="MEDIA GALLERY">
          <Row className="g-3 mt-2">
            {(photos || []).map((photo, index) => (
              <Col key={photo.id} xs={12} sm={6} md={4} className={`reveal-el delay-${(index % 3) * 100 + 100}`}>
                <Card style={{ backgroundColor: 'transparent', border: 'none', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ overflow: 'hidden', position: 'relative', aspectRatio: '4/3' }}>
                    <img 
                      src={photo.imageUrl}
                      alt={photo.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                    />
                  </div>
                  <div className="pt-2 text-white-50 font-body" style={{ fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {photo.title}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </SectionWrapper>
      </Container>
    </div>
  );
}

export default GalleryPage;
