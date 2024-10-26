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

// Axios instance with base URL from environment variable
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Interceptor to attach token to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error handler for logging errors in one place
const handleError = (error) => {
  console.error("API call error:", error.response || error.message);
  throw error; // Rethrow the error to handle it in the calling function
};

// Auth APIs
export const loginUser = (email, password) =>
  api.post("/auth/login", { email, password }).catch(handleError);

export const registerUser = (name, email, password) =>
  api.post("/auth/register", { name, email, password }).catch(handleError);

// Task APIs
export const getTasks = () => api.get("/tasks").catch(handleError);

export const createTask = (taskData) =>
  api.post("/tasks", taskData).catch(handleError);

export const updateTask = (id, updates) =>
  api.put(`/tasks/${id}`, updates).catch(handleError);

export const deleteTask = (id) => api.delete(`/tasks/${id}`).catch(handleError);
