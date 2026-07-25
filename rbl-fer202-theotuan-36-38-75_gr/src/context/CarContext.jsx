import React, { createContext, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from './AuthContext';
import {
  toggleFavorite as toggleReduxFavorite,
  setFavorites as setReduxFavorites,
  setSearchQuery as setReduxSearchQuery,
  selectFavorites,
  selectSearchQuery,
} from '../store/slices/carSlice';

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const favorites = useSelector(selectFavorites);
  const searchQuery = useSelector(selectSearchQuery);

  const storageKey = user ? `atelier_favorites_${user.username}` : 'atelier_favorites_guest';

  // Load favorites from local storage on user/storageKey changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        dispatch(setReduxFavorites(JSON.parse(saved)));
      } else if (user && user.favoriteCarIds) {
        dispatch(setReduxFavorites(user.favoriteCarIds));
      } else {
        dispatch(setReduxFavorites([]));
      }
    } catch (err) {
      console.error('Error syncing favorites on user transition', err);
    }
  }, [user, storageKey, dispatch]);

  // Keep localStorage in sync when Redux favorites state changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    } catch (err) {
      console.error('Error saving favorites update to localStorage', err);
    }
  }, [favorites, storageKey]);

  // Toggle favorite car ID
  const toggleFavorite = (carId) => {
    dispatch(toggleReduxFavorite(carId));
  };

  // Check if a car is favorited
  const isFavorite = (carId) => {
    return favorites.includes(carId);
  };

  const setSearchQuery = (query) => {
    dispatch(setReduxSearchQuery(query));
  };

  return (
    <CarContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCar = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCar must be used within a CarProvider');
  }
  return context;
};
