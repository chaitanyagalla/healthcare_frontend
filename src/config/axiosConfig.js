import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axioInstance = axios.create({
    baseURL: API_BASE_URL,
});

axioInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error)=> Promise.reject(error)
    )


export default axioInstance
