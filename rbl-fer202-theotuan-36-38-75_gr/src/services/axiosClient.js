import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Auth Token if exists in local storage
axiosClient.interceptors.request.use(
  (config) => {
    // If there is a need to attach token in future:
    const activeUser = localStorage.getItem('atelier_active_user');
    if (activeUser) {
      try {
        const parsed = JSON.parse(activeUser);
        if (parsed.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch (e) {
        console.error('Error parsing user session token', e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Extract data and handle errors centrally
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Centralized error handling
    let message = 'Có lỗi xảy ra khi kết nối tới máy chủ.';
    if (error.response) {
      // Server returned a status code outside the 2xx range
      message = error.response.data?.message || `Lỗi máy chủ (${error.response.status})`;
    } else if (error.request) {
      // Request was made but no response was received
      message = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại dịch vụ backend.';
    } else {
      // Something else triggered the error
      message = error.message;
    }
    error.customMessage = message;
    return Promise.reject(error);
  }
);

export default axiosClient;
