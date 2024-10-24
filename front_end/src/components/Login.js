import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use for navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Navigation hook to redirect users

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (error) {
      console.error("Error logging in", error);
      setError("Invalid email or password.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google"; // Redirect to Google Login
  };

  const handleResetPassword = () => {
    navigate("/forgot-password"); // Redirect to Forgot Password page
  };

  const handleRegister = () => {
    navigate("/register"); // Redirect to Register page
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Login
        </button>
      </form>

      <div className="mt-4">
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Sign in with Google
        </button>
      </div>

      <div className="flex mt-4 space-x-4">
        <button
          onClick={handleResetPassword}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Forgot Password?
        </button>

        <button
          onClick={handleRegister}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          New User? Register
        </button>
      </div>
    </div>
  );
};

export default Login;
