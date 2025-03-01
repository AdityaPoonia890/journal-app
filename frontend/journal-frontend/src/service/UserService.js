import axios from 'axios';

const BASE_API_URL = "http://localhost:8080"

export const signup = (user) => {
    return axios.post(BASE_API_URL+"/public/signup", user);
}

export const updateUser = (user) => {
    return axios.put(BASE_API_URL)
} 