import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token }); // You might want to decode token to get user info
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("http://localhost:8000/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    setUser({ token: response.data.token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
