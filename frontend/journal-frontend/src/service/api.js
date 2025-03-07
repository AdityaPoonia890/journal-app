/*import axios from 'axios';

// Create an instance of axios
const api = axios.create({
    baseURL: 'https://api.example.com', // Replace with your API base URL
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

// Add a request interceptor
api.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        // For example, you can add an authorization token here
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;  
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default api;*/