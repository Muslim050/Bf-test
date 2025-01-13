import axios from 'axios';
import Cookies from 'js-cookie';
import backendURL from '@/utils/url';

const axiosInstance = axios.create({
  baseURL: backendURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const { page, pageSize } = config.params || {};
  if (page || pageSize) {
    config.params = {
      ...config.params,
      ...(page && { page }),
      ...(pageSize && { page_size: pageSize }),
    };
  }
  return config;
});

export default axiosInstance;
