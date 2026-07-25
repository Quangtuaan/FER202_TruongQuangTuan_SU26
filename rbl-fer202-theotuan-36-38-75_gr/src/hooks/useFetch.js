import { useState, useEffect } from 'react';
import axiosClient from '../services/axiosClient';

/**
 * Custom Hook to handle promise-based fetches or API URLs.
 * 
 * @param {Function|string} fetchSource - An async function returning data OR an API url string
 * @param {Array} dependencies - Dependency array to trigger refetching
 */
export default function useFetch(fetchSource, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        let result;
        if (typeof fetchSource === 'function') {
          result = await fetchSource();
        } else if (typeof fetchSource === 'string') {
          result = await axiosClient.get(fetchSource);
        } else {
          throw new Error('Nguồn dữ liệu không hợp lệ.');
        }

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.customMessage || err.message || 'Lỗi khi tải dữ liệu.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error, setData };
}
