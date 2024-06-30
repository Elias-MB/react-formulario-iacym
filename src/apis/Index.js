import axios from "axios";
import dataConfig from './../services/config.json';

const urlBack = dataConfig.BaseURLBack

// export const ApiSeguraToken = axios.create({
//     baseURL: `${urlBack}/api/v1/`,
// });

// ApiSeguraToken.interceptors.request.use(config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

export const generalApi = axios.create({
    baseURL: `${urlBack}/registro/api/v1/`,
});