// // // routes/auth.js
// // const express = require("express");
// // const passport = require("passport");
// // const jwt = require("jsonwebtoken"); // Import jwt here

// // const {
// //   register,
// //   login,
// //   googleAuth,
// //   googleCallback,
// // } = require("../controllers/authController");

// // const router = express.Router();

// // router.post("/register", register);
// // router.post("/login", login);
// // router.get("/google", googleAuth);
// // router.get(
// //   "/google/callback",
// //   passport.authenticate("google", {
// //     failureRedirect: `${process.env.FRONTEND_URL}/login`,
// //     session: true, // Explicitly enable session management
// //   }),
// //   (req, res) => {
// //     // On success, `req.user` should be available here
// //     if (!req.user) {
// //       return res.status(401).json({ message: "Authentication failed" });
// //     }

// //     const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
// //       expiresIn: "1h",
// //     });
// //     res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
// //   }
// // );

// // module.exports = router;
// const express = require("express");
// const passport = require("passport");
// const {
//   register,
//   login,
//   googleAuth,
//   googleCallback,
// } = require("../controllers/authController");

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// // Google OAuth routes
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   googleCallback
// );

// module.exports = router;
const express = require("express");
const passport = require("passport");
const {
  register,
  login,
  googleAuth,
  googleCallback,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallback
);

module.exports = router;
