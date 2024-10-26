import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Navigate to the dashboard and clear URL params
      navigate("/dashboard", { replace: true });
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/" element={<AuthPage />} />
    </Routes>
  );
};

export default App;
