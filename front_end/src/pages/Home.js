import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Task Manager</h1>
      <Link to="/auth" className="bg-blue-500 text-white rounded px-4 py-2">
        Login / Signup
      </Link>
    </div>
  );
};

export default Home;
