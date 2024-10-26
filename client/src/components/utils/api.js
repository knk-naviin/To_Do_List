// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const loginUser = (email, password) =>
//   api.post("/auth/login", { email, password });

// export const registerUser = (name, email, password) =>
//   api.post("/auth/register", { name, email, password });

// export const getTasks = () => api.get("/tasks");

// export const createTask = (taskData) => api.post("/tasks", taskData);

// export const updateTask = (id, updates) => api.put(`/tasks/${id}`, updates);

// export const deleteTask = (id) => api.delete(`/tasks/${id}`);
import axios from "axios";

// Create an Axios instance with a base URL from the environment variable
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Interceptor to automatically attach the JWT token to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// General error handler to log errors in one place
const handleError = (error) => {
  if (error.response) {
    console.error(
      "API call error:",
      error.response.data.message || error.message
    );
  } else {
    console.error("API call error:", error.message);
  }
  throw error; // Rethrow the error to handle it in the calling function
};

// Authentication API functions
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Google Sign-In function for redirection to Google OAuth
export const googleSignIn = () => {
  window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
};

// Task API functions
export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post("/tasks", taskData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateTask = async (id, updates) => {
  try {
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export default api;
