import axios from 'axios';
// const apiUrl = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: 'https://library-management-server-livid.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

