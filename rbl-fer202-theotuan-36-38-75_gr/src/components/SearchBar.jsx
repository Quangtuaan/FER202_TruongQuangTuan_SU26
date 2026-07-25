import React from 'react';
import './SearchBar.css';

function SearchBar({ value, onSearchChange }) {
  return (
    <div className="car-search-bar">
      <label htmlFor="car-search" className="car-search-bar-label">
        Search cars
      </label>
      <input
        id="car-search"
        className="car-search-bar-input"
        type="text"
        value={value}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Enter car name..."
      />
    </div>
  );
}

export default SearchBar;
