import axios from "axios";

// Function to get CSRF token from cookies
function getCsrfToken() {
    const name = "csrftoken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Create Axios instance
const api = axios.create({
    baseURL: axios.defaults.baseURL, // Your Django API base URL
    withCredentials: true, // Ensures cookies (including CSRF token) are sent
});

// Axios request interceptor to attach CSRF token to every request
api.interceptors.request.use((config) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;