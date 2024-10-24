import axios from "axios";

const API_URL = "http://localhost:8000/api/tasks";

export const fetchTasks = () => {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const createTask = (title, dueDate, status) => {
  return axios.post(
    API_URL,
    { title, dueDate, status },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
};

export const updateTask = (taskId, data) => {
  return axios.put(`${API_URL}/${taskId}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const deleteTask = (taskId) => {
  return axios.delete(`${API_URL}/${taskId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
