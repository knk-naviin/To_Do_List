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

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (email, password) =>
  api.post("/auth/login", { email, password });

export const registerUser = (name, email, password) =>
  api.post("/auth/register", { name, email, password });

export const getTasks = () => api.get("/tasks");

export const createTask = (taskData) => api.post("/tasks", taskData);

export const updateTask = (id, updates) => api.put(`/tasks/${id}`, updates);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);
