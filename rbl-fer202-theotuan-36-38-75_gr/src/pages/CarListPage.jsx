import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import carService from '../services/carService';
import CarCard from '../components/CarCard';
import './CarListPage.css';

function CarListPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // Staged Filter States
  const [tempBrands, setTempBrands] = useState([]);
  const [tempMaxPrice, setTempMaxPrice] = useState(5000000);
  const [tempYear, setTempYear] = useState('all');

  // Applied Filter States
  const [appliedBrands, setAppliedBrands] = useState([]);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(5000000);
  const [appliedYear, setAppliedYear] = useState('all');

  // Compare States
  const [selectedCars, setSelectedCars] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const CARS_PER_PAGE = 4;

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await carService.getCars();
        setCars(data);
      } catch (err) {
        setError(err.customMessage || err.message || 'Không thể tải danh sách xe.');
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '70vh',
          display: 'grid',
          placeItems: 'center',
          backgroundColor: '#0b0c10',
          color: '#f5f5f5',
        }}
      >
        <div className="text-center">
          <div className="luxury-spinner-ring mb-3" style={{ margin: '0 auto' }}></div>
          <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Loading Inventory</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: '70vh',
          display: 'grid',
          placeItems: 'center',
          backgroundColor: '#0b0c10',
          color: '#f5f5f5',
        }}
      >
        <div className="text-center">
          <h3 className="text-uppercase mb-3" style={{ color: 'var(--color-gold)' }}>Error Loading Cars</h3>
          <p className="text-muted">{error}</p>
        </div>
      </div>
    );
  }

  const brands = [...new Set(cars.map((car) => car.brand))];
  const years = [...new Set(cars.map((car) => car.year))].sort((a, b) => b - a);

  // Apply filter rules
  const displayedCars = cars.filter((car) => {
    const matchesBrand = appliedBrands.length === 0 || appliedBrands.includes(car.brand);
    const matchesPrice = car.price <= appliedMaxPrice;
    const matchesYear = appliedYear === 'all' || car.year === parseInt(appliedYear);
    
    // Search query match (case-insensitive on name, brand, or type)
    const matchesSearch = !searchQuery || 
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBrand && matchesPrice && matchesYear && matchesSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(displayedCars.length / CARS_PER_PAGE);
  const paginatedCars = displayedCars.slice(
    (currentPage - 1) * CARS_PER_PAGE,
    currentPage * CARS_PER_PAGE
  );

  const handleBrandChange = (brand) => {
    setTempBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleApplyFilters = () => {
    setAppliedBrands(tempBrands);
    setAppliedMaxPrice(tempMaxPrice);
    setAppliedYear(tempYear);
    setCurrentPage(1); // Reset to first page
  };

  const handleClearAll = () => {
    setTempBrands([]);
    setTempMaxPrice(5000000);
    setTempYear('all');
    setAppliedBrands([]);
    setAppliedMaxPrice(5000000);
    setAppliedYear('all');
    setCurrentPage(1);
  };

  const handleCompareToggle = (car) => {
    const isAlreadySelected = selectedCars.some((selectedCar) => selectedCar.id === car.id);

    if (isAlreadySelected) {
      setSelectedCars((currentCars) =>
        currentCars.filter((selectedCar) => selectedCar.id !== car.id)
      );
      return;
    }

    if (selectedCars.length >= 2) {
      alert('You can only compare up to 2 cars.');
      return;
    }

    setSelectedCars((currentCars) => [...currentCars, car]);
  };

  const handleRemoveSelectedCar = (carId) => {
    setSelectedCars((currentCars) => currentCars.filter((car) => car.id !== carId));
  };

  return (
    <main className="car-list-page">
      <Container className="car-list-container">
        <Row className="gy-5">
          {/* Filter Sidebar Column */}
          <Col xs={12} lg={4} xl={3}>
            <aside className="filter-sidebar glass-panel">
              <h3 className="filter-title">Filters</h3>

              {/* Brand Filter */}
              <div className="filter-section">
                <label className="filter-label">Brand</label>
                <div className="filter-checkbox-list">
                  {brands.map((brand) => (
                    <label className="checkbox-item" key={brand}>
                      <input
                        type="checkbox"
                        checked={tempBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-divider"></div>

              {/* Price Range Filter */}
              <div className="filter-section">
                <label className="filter-label">Price Range</label>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={tempMaxPrice}
                  onChange={(e) => setTempMaxPrice(parseInt(e.target.value))}
                  className="gold-slider"
                />
                <div className="price-range-labels">
                  <span>$100K</span>
                  <span>Max: ${(tempMaxPrice / 1000).toLocaleString()}K</span>
                  <span>$5M+</span>
                </div>
              </div>

              <div className="filter-divider"></div>

              {/* Model Year Filter */}
              <div className="filter-section">
                <label className="filter-label">Model Year</label>
                <select
                  value={tempYear}
                  onChange={(e) => setTempYear(e.target.value)}
                  className="year-select"
                >
                  <option value="all">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="filter-actions mt-4">
                <button onClick={handleApplyFilters} className="apply-btn">
                  Apply Filters
                </button>
                <button onClick={handleClearAll} className="clear-btn">
                  Clear All
                </button>
              </div>
            </aside>
          </Col>

          {/* Listing Grid Column */}
          <Col xs={12} lg={8} xl={9}>
            {/* Compare Panel */}
            <section className="compare-panel glass-panel" aria-label="Selected cars for comparison">
              <div className="compare-panel-left">
                <p className="compare-panel-kicker">Compare Models</p>
                <h2 className="compare-panel-title">{selectedCars.length}/2 cars selected</h2>
              </div>

              {selectedCars.length > 0 ? (
                <div className="compare-panel-right">
                  <div className="compare-selected-list">
                    {selectedCars.map((car) => (
                      <div className="compare-selected-item" key={car.id}>
                        <span>{car.name}</span>
                        <button type="button" onClick={() => handleRemoveSelectedCar(car.id)}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  {selectedCars.length === 2 && (
                    <Link
                      to={`/compare?car1=${selectedCars[0].id}&car2=${selectedCars[1].id}`}
                      className="compare-now-btn"
                    >
                      Compare Now
                    </Link>
                  )}
                </div>
              ) : (
                <p className="compare-empty">No cars selected yet.</p>
              )}
            </section>

            {/* Results Title */}
            {searchQuery && (
              <div className="search-query-badge mb-4 d-flex align-items-center gap-2 text-white">
                <span>Kết quả tìm kiếm cho: <strong style={{ color: 'var(--color-gold)' }}>"{searchQuery}"</strong></span>
                <Link to="/cars" className="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill text-white" style={{ borderColor: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)' }}>
                  Xóa tìm kiếm
                </Link>
              </div>
            )}

            <section className="car-list-results-header">
              <h2>Available Models</h2>
              <span className="results-count">{displayedCars.length} cars found</span>
            </section>

            {/* Cars Grid */}
            <section className="car-list-results-grid">
              {paginatedCars.length > 0 ? (
                <Row className="g-4">
                  {paginatedCars.map((car) => {
                    const isSelected = selectedCars.some((selectedCar) => selectedCar.id === car.id);
                    const compareDisabled = selectedCars.length >= 2 && !isSelected;

                    return (
                      <Col key={car.id} xs={12} md={6}>
                        <CarCard
                          car={car}
                          isSelected={isSelected}
                          compareDisabled={compareDisabled}
                          onCompareToggle={handleCompareToggle}
                          onSelectCar={() => {}} // Handle quick view if needed or keep blank
                        />
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <div className="car-list-empty glass-panel py-5">
                  <div className="empty-icon">🚗</div>
                  <h3>No cars found.</h3>
                  <p>Try another configuration or reset filters.</p>
                </div>
              )}
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <section className="car-pagination">
                <button
                  className="pagination-arrow"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="pagination-arrow"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </section>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default CarListPage;
