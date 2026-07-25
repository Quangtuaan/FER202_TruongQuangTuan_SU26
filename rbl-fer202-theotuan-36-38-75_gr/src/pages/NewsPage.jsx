import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import SectionWrapper from '../components/SectionWrapper';
import './NewsPage.css';

function NewsPage() {
  const { data: newsList, loading, error } = useFetch('/news', []);

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
    <div className="news-page-container">
      <Container>
        <SectionWrapper title="LATEST WORLD EVENTS" subtitle="NEWS & REVIEWS">
          <Row className="g-4 mt-2">
            {(newsList || []).map((news, index) => (
              <Col key={news.id} xs={12} md={6} lg={4} className={`reveal-el delay-${(index % 3) * 100 + 100}`}>
                <div className="news-card">
                  <div className="news-img-wrapper">
                    <img 
                      src={news.imageUrl}
                      alt={news.title}
                      className="news-card-img"
                      onError={(e) => {
                        // Fallback image in case default is offline or not found
                        e.target.src = "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80";
                      }}
                    />
                    <span className="news-tag-badge">
                      {news.tag}
                    </span>
                  </div>
                  <div className="news-card-body">
                    <div className="news-meta">
                      {new Date(news.publishedAt).toLocaleDateString('vi-VN')} • BY {news.author}
                    </div>
                    <h3 className="news-card-title">
                      {news.title}
                    </h3>
                    <p className="news-card-text">
                      {news.summary}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </SectionWrapper>
      </Container>
    </div>
  );
}

export default NewsPage;
