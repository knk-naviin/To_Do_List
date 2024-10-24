import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("authToken", response.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      alert(
        "Error logging in: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/register", {
        email,
        password,
      });
      alert("Registration successful, please login");
      setIsLogin(true);
    } catch (error) {
      alert(
        "Error registering: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  const handleForgotPassword = async () => {
    const userEmail = prompt("Please enter your email:");
    if (userEmail) {
      try {
        await axios.post("http://localhost:8000/api/auth/forgot-password", {
          email: userEmail,
        });
        alert("Password reset link sent to your email!");
      } catch (error) {
        alert("Error sending reset password link.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isLogin ? "Login" : "Signup"}
      </h1>
      <form onSubmit={isLogin ? handleLogin : handleRegister} className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 w-full mb-2"
        >
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-blue-500 underline mb-2"
        >
          Forgot Password?
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white rounded px-4 py-2 w-full"
        >
          Sign in with Google
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-500 underline"
      >
        Switch to {isLogin ? "Signup" : "Login"}
      </button>
    </div>
  );
};

export default Auth;
