import axios from 'axios';

/**
 * Centralized axios instance.
 *
 * In dev: Vite proxies `/api` -> `http://localhost:8080` (see vite.config.ts).
 * In prod: set VITE_API_BASE_URL to your deployed Spring Boot host.
 */
const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api';

const axiosClient = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor – great spot to attach auth tokens later
axiosClient.interceptors.request.use((config) => {
  // const token = localStorage.getItem('token');
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor – central error normalization
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // eslint-disable-next-line no-console
    console.error('[axios] error:', error?.response?.status, error?.message);
    return Promise.reject(error);
  },
);

export default axiosClient;
