import axios from 'axios';

const baseURL = import.meta.env.VITE_NEWS_BASE_URL

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 2000,
})

export default axiosInstance;