import axios from 'axios';

const BASE_URL = ' https://magazynapp-9f56f45634c5.herokuapp.com/api/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
