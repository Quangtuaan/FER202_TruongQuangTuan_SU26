import axiosClient from './axiosClient';

const carService = {
  getCars: (query = '') => {
    const url = query ? `/cars?q=${encodeURIComponent(query)}` : '/cars';
    return axiosClient.get(url);
  },

  getCarById: (id) => {
    return axiosClient.get(`/cars/${id}`);
  },

  addCar: (carData) => {
    return axiosClient.post('/cars', carData);
  },

  updateCar: (id, carData) => {
    return axiosClient.put(`/cars/${id}`, carData);
  },

  deleteCar: (id) => {
    return axiosClient.delete(`/cars/${id}`);
  },

  getBrands: () => {
    return axiosClient.get('/brands');
  },
};

export default carService;
