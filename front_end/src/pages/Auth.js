import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and registration

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("authToken", response.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
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
      setIsLogin(true); // Switch to login form after successful registration
    } catch (error) {
      console.error(error);
      alert(
        "Error registering: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Signup"}</h1>
      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Signup" : "Login"}
      </button>
    </div>
  );
};

export default Auth;
