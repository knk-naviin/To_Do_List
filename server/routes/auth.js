const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  googleLogin,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");
const passport = require("passport");

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Google OAuth login route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", passport.authenticate("google"), googleLogin);

// Forgot Password route
router.post("/forgotPassword", forgotPassword);

// Reset Password route
router.post("/resetPassword/:token", resetPassword);

module.exports = router;
