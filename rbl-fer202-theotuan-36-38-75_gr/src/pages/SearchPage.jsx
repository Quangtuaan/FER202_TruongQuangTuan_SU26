import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import carService from '../services/carService';
import CarCard from '../components/CarCard';
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);

  // Fetch cars using custom hook and debounce value
  const { data: cars, loading, error } = useFetch(
    () => carService.getCars(debouncedQuery),
    [debouncedQuery]
  );
  
  const searchInputRef = useRef(null);

  // Auto-focus on the search input when the page loads
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Sync query parameter with URL
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setSearchParams({ q: debouncedQuery.trim() });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  // Normalize car fields (image / imageUrl)
  const displayCars = (cars || []).map((car) => ({
    ...car,
    image: car.imageUrl || car.image,
  }));

  return (
    <div className="search-page-container">
      <Container>
        <div className="search-box-wrapper">
          <h1 className="search-page-title text-white">TÌM KIẾM SIÊU XE</h1>
          <p className="search-page-subtitle">Tìm kiếm các dòng xe mơ ước bằng Tên xe, Hãng xe hoặc Động cơ</p>
          
          <div className="search-input-wrapper">
            <Form.Control
              ref={searchInputRef}
              type="text"
              placeholder="Nhập tên xe, hãng xe, đời xe..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-page-input"
            />
            <button className="search-icon-btn" aria-label="Search button">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="warning" className="mb-2" />
            <p className="text-muted font-body" style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>
              ĐANG TÌM KIẾM DỮ LIỆU SIÊU XE...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-5 text-danger">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="search-results-info">
              Tìm thấy <span>{displayCars.length}</span> siêu xe phù hợp
            </div>

            {displayCars.length > 0 ? (
              <Row className="g-4">
                {displayCars.map((car) => (
                  <Col key={car.id} xs={12} md={6} lg={4}>
                    <CarCard car={car} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="search-empty-state luxury-glass">
                <i className="bi bi-search-heart search-empty-icon"></i>
                <h4>Không tìm thấy kết quả</h4>
                <p>Thử tìm kiếm với từ khóa khác như "Ferrari", "Lamborghini" hoặc "2024"</p>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default SearchPage;
