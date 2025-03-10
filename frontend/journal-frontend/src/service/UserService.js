import axios from 'axios';

const BASE_API_URL = "http://localhost:8080"

// Create an instance of axios

const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // ✅ Required for JWT authentication
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
/*api.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;  
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);*/


export const signup = (user) => {
    return axios.post(BASE_API_URL+"/public/signup", user);
}

export const login = (user) => {
    return axios.post(BASE_API_URL+"/public/login", user);
}

export const greet = () => {
    return api.get("/user");
}  

export const updateUser = (user) => {
    return api.put("/user", user);
}

export const deleteUser = () => {
    return api.delete("/user");
}

export const getUser = (userName) => {
    return api.get("/user/"+ userName);
}

export const postJournal = (journal) => {
    return api.post("/journal", journal);
}

export const getJournals = () => {
    return api.get("/journal");
}

export const getJournalById = (id) => {
    return api.get("/journal/id/"+id);
}

