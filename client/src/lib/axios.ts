import axios from 'axios';

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST;
const BACKEND_API_URL = process.env.BACKEND_API_URL;

if (!RAPIDAPI_KEY) {
  console.warn('NEXT_PUBLIC_RAPIDAPI_KEY is not defined in environment variables');
}

if (!RAPIDAPI_HOST) {
  console.warn('NEXT_PUBLIC_RAPIDAPI_HOST is not defined in environment variables');
}

if (!BACKEND_API_URL) {
  console.warn('BACKEND_API_URL is not defined in environment variables');
}

const rapidApiInstance = axios.create({
  baseURL: 'https://jsearch.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY || '',
    'X-RapidAPI-Host': RAPIDAPI_HOST || 'jsearch.p.rapidapi.com',
  },
});

export const backendApi = axios.create({
  baseURL: BACKEND_API_URL || 'http://localhost:5001/api',
});

backendApi.interceptors.request.use(
  (config: { headers: { Authorization: string; }}) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default rapidApiInstance;