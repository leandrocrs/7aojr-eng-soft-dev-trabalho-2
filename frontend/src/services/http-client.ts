import axios from "axios";

console.log({ VITE_API_URL: import.meta.env.VITE_API_URL });

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})