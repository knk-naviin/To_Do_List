const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Adjust the path as necessary

// Register route
router.post("/register", async (req, res) => {
  try {
    // Handle user registration logic here
    const { username, password } = req.body;
    // Add your validation and user creation logic
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    // Handle user login logic here
    const { username, password } = req.body;
    // Add your validation and authentication logic
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
