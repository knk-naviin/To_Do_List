const express = require("express");
const passport = require("passport");
const router = express.Router();

// Initiate Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Handle Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication
    res.redirect("/dashboard");
  }
);

module.exports = router;
