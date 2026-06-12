import axios from 'axios';
import { readJSON } from './storage.js';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const auth = readJSON('preproute.auth.v1');
  if (auth?.token) config.headers.Authorization = `Bearer ${auth.token}`;
  return config;
});
