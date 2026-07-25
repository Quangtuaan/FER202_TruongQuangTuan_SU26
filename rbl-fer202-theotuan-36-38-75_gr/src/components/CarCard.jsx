import React from 'react';
import { Link } from 'react-router-dom';
import { useCar } from '../context/CarContext';
import './CarCard.css';

function CarCard({ car, isSelected, compareDisabled, onCompareToggle, onSelectCar }) {
  const { toggleFavorite, isFavorite } = useCar();

  const handleClick = () => {
    if (onSelectCar) {
      onSelectCar(car);
    }
  };

  if (!car) return null;

  return (
    <div className={`car-card glass-panel group ${isSelected ? 'car-card-selected' : ''} shimmer-container`}>
      <div className="car-card-img-wrapper">
        <div 
          className="car-card-img" 
          style={{ backgroundImage: `url(${car.image || car.imageUrl})` }}
          role="img"
          aria-label={car.name}
        />
        <div className="car-card-gradient-overlay" />
        
        {/* Heart Icon Button for Favorites */}
        <button
          type="button"
          className={`car-card-fav-btn ${isFavorite(car.id) ? 'favorited' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(car.id);
          }}
          aria-label="Toggle Favorite"
        >
          <i className={`bi ${isFavorite(car.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>

        {car.isNew && (
          <div className="new-arrival-badge">
            <span>New Arrival</span>
          </div>
        )}
      </div>
      
      <div className="car-card-body">
        <div className="car-card-main-info">
          <div>
            <h4 className="car-card-title">{car.name}</h4>
            <p className="car-meta-label">{car.brand} • {car.year}</p>
          </div>
          <div className="text-end">
            <p className="car-card-price">
              {typeof car.price === 'number' ? `$${car.price.toLocaleString()}` : car.price}
            </p>
          </div>
        </div>

        {/* Spec Grid */}
        <div className="car-specs-grid">
          <div className="car-spec-item">
            <span className="car-spec-label">Horsepower</span>
            <span className="car-spec-value">{car.horsepower || 'N/A'} HP</span>
          </div>
          <div className="car-spec-item">
            <span className="car-spec-label">0-100 km/h</span>
            <span className="car-spec-value">{car.acceleration0to100 ? `${car.acceleration0to100} SEC` : 'N/A'}</span>
          </div>
          <div className="car-spec-item spec-reveal">
            <span className="car-spec-label">Top Speed</span>
            <span className="car-spec-value">{car.topSpeedKmh ? `${car.topSpeedKmh} KM/H` : 'N/A'}</span>
          </div>
          <div className="car-spec-item spec-reveal">
            <span className="car-spec-label">Engine</span>
            <span className="car-spec-value text-truncate">{car.engineType || 'N/A'}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="car-card-actions">
          <Link 
            to={`/cars/${car.id}`}
            className="car-quick-view-btn text-center"
            style={{ textDecoration: 'none', display: 'block' }}
          >
            XEM CHI TIẾT
          </Link>
          {onCompareToggle && (
            <button 
              type="button" 
              className={`car-compare-btn ${isSelected ? 'active-selected' : ''}`}
              disabled={compareDisabled}
              onClick={() => onCompareToggle(car)}
            >
              {isSelected ? 'ĐÃ CHỌN' : 'SO SÁNH'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarCard;
