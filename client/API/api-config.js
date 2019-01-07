import axios from 'axios';

const API = axios.create({
  baseURL: '/api/reports/'
});

// API.interceptors.request.use((config) => {
//   const token = window.localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

API.interceptors.response.use(({
  data
}) => {
  return data;
}, (error) => {
  return error.response.data ? error.response.data : error.response;
});

export default API;
