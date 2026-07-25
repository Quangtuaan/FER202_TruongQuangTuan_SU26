import { useState, useEffect } from 'react';

/**
 * Custom Hook to debounce a value by a specified delay.
 * 
 * @param {*} value - The input value to debounce
 * @param {number} delay - The delay in milliseconds (default 500ms)
 */
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
