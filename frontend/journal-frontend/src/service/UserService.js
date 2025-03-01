import axios from 'axios';

const BASE_API_URL = "http://localhost:8080"

export const signup = (user) => {
    return axios.post(BASE_API_URL+"/public/signup", user);
}

export const updateUser = (user) => {
    return axios.put(BASE_API_URL)
} 

export const login = (user) => {
    return axios.post(BASE_API_URL+"/public/login", user);
}

export const greet = () => {
    return axios.get(BASE_API_URL+"/user");
}    