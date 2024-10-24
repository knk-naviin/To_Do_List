// server/server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // Ensure this path is correct
const taskRoutes = require("./routes/taskRoutes"); // Ensure this path is correct

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from your frontend

const mongo_URI = process.env.mongo_URI; // Use the environment variable

mongoose
  .connect(mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use("/api/auth", authRoutes); // Use the authRoutes
app.use("/api/tasks", taskRoutes); // Make sure taskRoutes is correctly set up

const PORT = process.env.PORT || 8000; // Ensure you have a port defined
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
