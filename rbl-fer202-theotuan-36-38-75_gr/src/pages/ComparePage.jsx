import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import carService from '../services/carService';
import { useCar } from '../context/CarContext';
import './ComparePage.css';

function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useCar();

  const car1Id = parseInt(searchParams.get('car1'));
  const car2Id = parseInt(searchParams.get('car2'));

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await carService.getCars();
        // Normalize cars data (images)
        const normalized = data.map((car) => ({
          ...car,
          image: car.imageUrl || car.image,
        }));
        setCars(normalized);
      } catch (err) {
        console.error('Error fetching cars for comparison', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) {
    return (
      <main className="compare-page d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', backgroundColor: '#0b0c10', color: '#fff' }}>
        <Container className="text-center">
          <Spinner animation="border" variant="warning" className="mb-3" />
          <h5 style={{ color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase' }}>Loading Comparison Dataset</h5>
        </Container>
      </main>
    );
  }

  const defaultCar1 = cars[0] || {};
  const defaultCar2 = cars[1] || cars[0] || {};

  const car1 = cars.find((c) => c.id === car1Id) || defaultCar1;
  const car2 = cars.find((c) => c.id === car2Id) || defaultCar2;

  const handleSelectAlpha = (e) => {
    const id = e.target.value;
    setSearchParams({ car1: id, car2: car2.id });
  };

  const handleSelectBeta = (e) => {
    const id = e.target.value;
    setSearchParams({ car1: car1.id, car2: id });
  };

  // Helper to determine gold-glow styling for better specs
  const getBetterClass = (val1, val2, direction = 'higher') => {
    if (val1 === undefined || val2 === undefined || val1 === val2) return '';
    if (direction === 'higher') {
      return val1 > val2 ? 'gold-glow' : '';
    } else {
      return val1 < val2 ? 'gold-glow' : '';
    }
  };

  return (
    <main className="compare-page">
      <Container className="compare-page-container">
        {/* Header Section */}
        <header className="compare-page-header">
          <Row className="align-items-end gy-4">
            <Col xs={12} md={6}>
              <h1 className="compare-page-title">Compare Supercars</h1>
              <p className="compare-page-subtitle">
                Analyze performance, design, and engineering side by side.
              </p>
            </Col>
            <Col xs={12} md={6}>
              <div className="d-flex flex-column flex-sm-row gap-4 justify-content-md-end">
                <div className="compare-select-wrapper flex-grow-1 max-width-sm">
                  <label className="selector-label">Selection Alpha</label>
                  <select
                    value={car1.id}
                    onChange={handleSelectAlpha}
                    className="compare-select"
                  >
                    {cars.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.brand} {c.name}
                      </option>
                    ))}
                  </select>
                  <svg className="compare-select-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="compare-select-wrapper flex-grow-1 max-width-sm">
                  <label className="selector-label">Selection Beta</label>
                  <select
                    value={car2.id}
                    onChange={handleSelectBeta}
                    className="compare-select"
                  >
                    {cars.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.brand} {c.name}
                      </option>
                    ))}
                  </select>
                  <svg className="compare-select-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Col>
          </Row>
        </header>

        {/* Preview Cards Grid */}
        <section className="compare-card-grid">
          {/* Card Alpha */}
          <div className="glass-card">
            <div className="compare-card-img-wrapper">
              <div className="compare-card-overlay" />
              <div
                className="compare-card-img"
                style={{ backgroundImage: `url(${car1.image})` }}
                role="img"
                aria-label={car1.name}
              />
              <div className="compare-card-info">
                <span className="compare-card-badge">{car1.type}</span>
                <h3 className="compare-card-title">{car1.name}</h3>
              </div>
            </div>
            <div className="compare-card-actions">
              <Link to={`/cars/${car1.id}`} className="compare-view-details-btn">
                VIEW DETAILS
              </Link>
              <button 
                type="button" 
                className={`compare-favorite-btn ${isFavorite(car1.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(car1.id)}
                aria-label="Toggle Favorite"
              >
                <i className={`bi ${isFavorite(car1.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
              </button>
            </div>
          </div>

          {/* Card Beta */}
          <div className="glass-card">
            <div className="compare-card-img-wrapper">
              <div className="compare-card-overlay" />
              <div
                className="compare-card-img"
                style={{ backgroundImage: `url(${car2.image})` }}
                role="img"
                aria-label={car2.name}
              />
              <div className="compare-card-info">
                <span className="compare-card-badge">{car2.type}</span>
                <h3 className="compare-card-title">{car2.name}</h3>
              </div>
            </div>
            <div className="compare-card-actions">
              <Link to={`/cars/${car2.id}`} className="compare-view-details-btn">
                VIEW DETAILS
              </Link>
              <button 
                type="button" 
                className={`compare-favorite-btn ${isFavorite(car2.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(car2.id)}
                aria-label="Toggle Favorite"
              >
                <i className={`bi ${isFavorite(car2.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
              </button>
            </div>
          </div>
        </section>

        {/* Technical Specs Comparison Table */}
        <section className="spec-table-container glass-panel">
          <table className="spec-table">
            <thead className="spec-table-head">
              <tr>
                <th className="spec-header-title p-4 p-md-5">Technical Specs</th>
                <th className="p-4 p-md-5">{car1.name}</th>
                <th className="p-4 p-md-5">{car2.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="spec-row">
                <td className="spec-name-label">Brand</td>
                <td>{car1.brand}</td>
                <td>{car2.brand}</td>
              </tr>
              <tr className="spec-row">
                <td className="spec-name-label">Price (EST)</td>
                <td className={getBetterClass(car1.price, car2.price, 'lower')}>
                  ${car1.price.toLocaleString()}
                </td>
                <td className={getBetterClass(car2.price, car1.price, 'lower')}>
                  ${car2.price.toLocaleString()}
                </td>
              </tr>
              <tr className="spec-row">
                <td className="spec-name-label">Year</td>
                <td>{car1.year}</td>
                <td>{car2.year}</td>
              </tr>
              <tr className="spec-row">
                <td className="spec-name-label">Engine type</td>
                <td>{car1.engineType}</td>
                <td>{car2.engineType}</td>
              </tr>
              <tr className="spec-row">
                <td className="spec-name-label">Engine CC</td>
                <td className={getBetterClass(car1.engineCC, car2.engineCC, 'higher')}>
                  {car1.engineCC ? `${car1.engineCC.toLocaleString()} cc` : 'N/A'}
                </td>
                <td className={getBetterClass(car2.engineCC, car1.engineCC, 'higher')}>
                  {car2.engineCC ? `${car2.engineCC.toLocaleString()} cc` : 'N/A'}
                </td>
              </tr>
              <tr className="spec-row">
                <td className="spec-name-label">Horsepower</td>
                <td className={getBetterClass(car1.horsepower, car2.horsepower, 'higher')}>
                  {car1.horsepower} hp
                </td>
                <td className={getBetterClass(car2.horsepower, car1.horsepower, 'higher')}>
                  {car2.horsepower} hp
                </td>
              </tr>
              <tr className="spec-row">
                <td className="spec-name-label">Torque</td>
                <td className={getBetterClass(car1.torque, car2.torque, 'higher')}>
                  {car1.torque} Nm
                </td>
                <td className={getBetterClass(car2.torque, car1.torque, 'higher')}>
                  {car2.torque} Nm
                </td>
              </tr>
              <tr className="spec-row">
                <td className="spec-name-label">0–100 km/h</td>
                <td className={getBetterClass(car1.acceleration0to100, car2.acceleration0to100, 'lower')}>
                  {car1.acceleration0to100}s
                </td>
                <td className={getBetterClass(car2.acceleration0to100, car1.acceleration0to100, 'lower')}>
                  {car2.acceleration0to100}s
                </td>
              </tr>
              <tr className="spec-row">
                <td className="spec-name-label">Top Speed</td>
                <td className={getBetterClass(car1.topSpeedKmh, car2.topSpeedKmh, 'higher')}>
                  {car1.topSpeedKmh} km/h
                </td>
                <td className={getBetterClass(car2.topSpeedKmh, car1.topSpeedKmh, 'higher')}>
                  {car2.topSpeedKmh} km/h
                </td>
              </tr>
              <tr className="spec-row">
                <td className="spec-name-label">Transmission</td>
                <td>{car1.transmission}</td>
                <td>{car2.transmission}</td>
              </tr>
              <tr className="spec-row">
                <td className="spec-name-label">Drivetrain</td>
                <td>{car1.drivetrain}</td>
                <td>{car2.drivetrain}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Call to Action Section */}
        <section className="showing-cta">
          <div className="showing-cta-divider" />
          <div>
            <h2 className="showing-cta-title">Request a Private Showing</h2>
            <p className="showing-cta-subtitle">
              Experience the mechanical symphonies and engineering precision of these masterpieces in person.
            </p>
            <div className="showing-cta-actions">
              <button type="button" className="cta-contact-btn">
                CONTACT DEALER
              </button>
              <button type="button" className="cta-pdf-btn">
                DOWNLOAD FULL PDF REPORT
              </button>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}

export default ComparePage;
