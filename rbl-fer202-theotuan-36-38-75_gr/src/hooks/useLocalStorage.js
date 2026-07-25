import { useState, useEffect, useRef } from 'react';

/**
 * Custom Hook to persistent state synchronization with localStorage.
 * Handles dynamic key changes seamlessly.
 * 
 * @param {string} key - LocalStorage key
 * @param {*} initialValue - Fallback value if key is not found
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key', key, error);
      return initialValue;
    }
  });

  const keyRef = useRef(key);

  useEffect(() => {
    if (keyRef.current !== key) {
      keyRef.current = key;
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error('Error syncing localStorage key change', key, error);
        setStoredValue(initialValue);
      }
    }
  }, [key, initialValue]);

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage key', key, error);
    }
  };

  return [storedValue, setValue];
}
