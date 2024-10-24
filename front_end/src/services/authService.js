import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const register = (name, email, password) => {
  return axios.post(`${API_URL}/register`, { name, email, password });
};

export const googleLogin = () => {
  window.location.href = `${API_URL}/google`;
};
