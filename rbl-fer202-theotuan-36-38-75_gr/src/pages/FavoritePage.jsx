import React, { useMemo } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCar } from '../context/CarContext';
import { useAuth } from '../context/AuthContext';
import carService from '../services/carService';
import CarCard from '../components/CarCard';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import './FavoritePage.css';

const FavoritePage = () => {
  const { favorites: contextFavorites } = useCar();
  const { user } = useAuth();
  
  const storageKey = user ? `atelier_favorites_${user.username}` : 'atelier_favorites_guest';
  const [localFavorites] = useLocalStorage(storageKey, []);

  // Fetch cars list using custom useFetch hook
  const { data: cars, loading, error } = useFetch(() => carService.getCars(), []);

  // Find car details matching the favorite IDs (reactive to context and localStorage)
  const favoriteCars = useMemo(() => {
    if (!cars) return [];
    
    const activeFavorites = contextFavorites.length > 0 ? contextFavorites : localFavorites;
    
    // Normalize car data
    const normalized = cars.map((car) => ({
      ...car,
      image: car.imageUrl || car.image,
    }));

    return normalized.filter((car) => activeFavorites.includes(car.id));
  }, [cars, contextFavorites, localFavorites]);

  return (
    <div className="favorites-page-container">
      <Container>
        <div className="fav-page-header">
          <h1 className="fav-page-title text-white">DANH SÁCH YÊU THÍCH</h1>
          <p className="fav-page-subtitle font-body">Nơi lưu giữ những siêu kiệt tác nghệ thuật mà bạn khao khát sở hữu</p>
        </div>

        {/* Authentication Notice if Guest */}
        {!user && (
          <div className="fav-auth-alert font-body">
            <span>
              <i className="bi bi-info-circle-fill me-2 text-gold"></i>
              Bạn đang duyệt với tư cách Khách. Hãy <Link to="/login">Đăng nhập</Link> để lưu danh sách này vĩnh viễn.
            </span>
          </div>
        )}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="warning" className="mb-2" />
            <p className="text-muted font-body" style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>
              ĐANG TẢI XE YÊU THÍCH...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-5 text-danger font-body">
            <p>{error}</p>
          </div>
        ) : favoriteCars.length > 0 ? (
          <Row className="g-4">
            {favoriteCars.map((car) => (
              <Col key={car.id} xs={12} md={6} lg={4}>
                <CarCard car={car} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="fav-empty-card luxury-glass">
            <i className="bi bi-heart-break fav-empty-icon"></i>
            <h4>Danh sách trống</h4>
            <p>Hãy bắt đầu hành trình khám phá và lưu trữ những siêu phẩm bằng cách nhấn nút thả tim trên từng sản phẩm.</p>
            <Button as={Link} to="/cars" className="fav-browse-btn btn-gold-shimmer">
              DUYỆT DANH SÁCH XE
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default FavoritePage;
