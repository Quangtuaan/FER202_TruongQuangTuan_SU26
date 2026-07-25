import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error('Error reading favorites from localStorage', err);
    return [];
  }
};

const saveFavorites = (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (err) {
    console.error('Error saving favorites to localStorage', err);
  }
};

const initialState = {
  favorites: loadFavorites(),
  searchQuery: '',
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      if (state.favorites.includes(carId)) {
        state.favorites = state.favorites.filter((id) => id !== carId);
      } else {
        state.favorites.push(carId);
      }
      saveFavorites(state.favorites);
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
      saveFavorites(state.favorites);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleFavorite, setFavorites, setSearchQuery } = carSlice.actions;

export const selectFavorites = (state) => state.car.favorites;
export const selectSearchQuery = (state) => state.car.searchQuery;

export default carSlice.reducer;
