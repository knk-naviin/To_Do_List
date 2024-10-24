import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const login = (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const register = (email, password) => {
  return api.post("/auth/register", { email, password });
};

// Additional API methods can be added here...
