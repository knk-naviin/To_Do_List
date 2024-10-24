import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import GoogleAuthSuccess from "./pages/GoogleAuthSuccess";
import Auth from "../src/components/Auth";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/success" element={<GoogleAuthSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
