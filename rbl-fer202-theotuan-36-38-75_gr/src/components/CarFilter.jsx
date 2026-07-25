import React from 'react';
import './CarFilter.css';

function CarFilter({
  brands = [],
  types = [],
  selectedBrand,
  selectedType,
  onBrandChange,
  onTypeChange,
  onResetFilters,
}) {
  return (
    <div className="car-filter">
      <div className="car-filter-group">
        <label htmlFor="brand-filter" className="car-filter-label">
          Brand
        </label>
        <select
          id="brand-filter"
          className="car-filter-select"
          value={selectedBrand}
          onChange={(event) => onBrandChange(event.target.value)}
        >
          <option value="all">All brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="car-filter-group">
        <label htmlFor="type-filter" className="car-filter-label">
          Type
        </label>
        <select
          id="type-filter"
          className="car-filter-select"
          value={selectedType}
          onChange={(event) => onTypeChange(event.target.value)}
        >
          <option value="all">All types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <button type="button" className="car-filter-reset" onClick={onResetFilters}>
        Reset
      </button>
    </div>
  );
}

export default CarFilter;
