import axios from 'axios';

const BASE_API_URL = import.meta.env.AXIOS_BASE_URL || "https://journal-app-1-pge0.onrender.com";
//https://journal-app-1-pge0.onrender.com

// Create an instance of axios

const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000,
    
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

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const errorCode = error.response?.data?.code;
            
            if (errorCode === 'TOKEN_EXPIRED' || errorCode === 'INVALID_TOKEN') {
                // Clear stored tokens
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                
                // Redirect to login
                //window.location.href = '/login';
                
                // Optional: Show a message
                alert('Your session has expired. Please logout and login again.');
            }
        }
        return Promise.reject(error);
    }
);


export const signup = (user) => {
    return api.post(BASE_API_URL+"/public/signup", user);
}

export const login = (user) => {
    return api.post(BASE_API_URL+"/public/login", user);
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
    const formData = new FormData();
    formData.append("title", journal.title);
    formData.append("content", journal.content);
    if (journal.image) {
        formData.append("image", journal.image); // Assuming `journal.image` is a File object
    }

    return api.post("/journal", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',  // This is handled automatically by axios, so you can omit it
        }
    });
}

export const getJournals = () => {
    return api.get("/journal");
}

export const getJournalById = (id) => {
    return api.get("/journal/id/"+id);
}

export const updateJournal = (id, journal) => {
    const formData = new FormData();
    formData.append("title", journal.title);
    formData.append("content", journal.content);
    if (journal.image) {
        formData.append("image", journal.image);  // Assuming `journal.image` is a File object
    }

    return api.put(`/journal/id/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',  // This is handled automatically by axios, so you can omit it
        }
    });
}

export const deleteJOurnal = (id) => {
    return api.delete("/journal/id/" + id);
}