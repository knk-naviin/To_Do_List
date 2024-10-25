import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <button
        onClick={handleLogout}
        className="ml-auto bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
