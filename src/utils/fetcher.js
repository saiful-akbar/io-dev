import axios from 'axios';

/**
 * Inisialisasi default untuk request fetch api
 */
const fetcher = axios.create({
  baseURL: process.env.API_URL,
  defaults: { withCredentials: true },
  headers: {
    'Content-Type': 'application/json',
  },
});

export default fetcher;
