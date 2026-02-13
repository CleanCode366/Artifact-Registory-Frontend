import { createAxiosClient } from "../axiosFactory";

const backendApiUrl = "http://localhost:8000/";
// FOR CALLING PUBLIC BACKEND APIS

export const detectAIClient = createAxiosClient(
    backendApiUrl, 
    [], 
    500000,
    false
)