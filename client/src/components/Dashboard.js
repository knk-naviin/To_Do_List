import React, { useEffect, useState } from "react";
import TaskBoard from "./TaskBoard";
import { useNavigate } from "react-router-dom";
import "./dash.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setIsLoggedIn(!!storedToken); // Check if token exists

    // Handle automatic login from URL params (optional)
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth"); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isLoggedIn ? (
        <div>
          <nav className="navbar bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold">Task Manager Dashboard</h1>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </nav>

          <TaskBoard />
        </div>
      ) : (
        <p className="text-center text-xl p-4">
          Please log in to access the dashboard.
        </p>
      )}
    </div>
  );
};

export default Dashboard;
