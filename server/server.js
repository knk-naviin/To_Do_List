const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session"); // Import session
const passport = require("./config/passport-setup");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session middleware
app.use(
  session({
    secret: process.env.JWT_SECRET, // Use your JWT_SECRET
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose
  .connect(process.env.mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
