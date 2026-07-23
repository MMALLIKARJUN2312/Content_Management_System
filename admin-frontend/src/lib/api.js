import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
});

// Centralized session-expiry handling: a 401 from anywhere except an actual
// login attempt (which is an expected "wrong credentials" case, not a session
// expiry) means the cookie is gone/invalid, so bounce to /login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginAttempt = error.config?.url?.includes('/auth/login');
    const status = error.response?.status;

    if (
      status === 401 &&
      !isLoginAttempt &&
      typeof window !== 'undefined' &&
      window.location.pathname !== '/login'
    ) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

export default api;
