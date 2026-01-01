export const API_CONFIG = {
  mode: (import.meta.env.VITE_API_MODE as 'mock' | 'real') || 'mock',
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
};
