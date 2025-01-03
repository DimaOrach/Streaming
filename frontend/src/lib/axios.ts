import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', //our backend port
});