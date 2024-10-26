import React, { useEffect, useState } from "react";
import TaskBoard from "./TaskBoard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/auth"); // Redirect to login if no token
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth");
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
