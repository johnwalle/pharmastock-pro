// import axios from 'axios';

// let accessToken = null;

// const api = axios.create({
//   baseURL: 'http://localhost:4000/api',
//   withCredentials: true,
// });

// api.interceptors.request.use(async (config) => {
//   if (accessToken) {
//     config.headers['Authorization'] = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status === 401 && !error.config._retry) {
//       error.config._retry = true;
//       try {
//         const res = await axios.post('http://localhost:4000/api/refresh-token', {}, { withCredentials: true });
//         accessToken = res.data.accessToken;
//         error.config.headers['Authorization'] = `Bearer ${accessToken}`;
//         return api(error.config);
//       } catch (e) {
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export const setAccessToken = (token) => {
//   accessToken = token;
// };

// export default api;
