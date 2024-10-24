// // require("dotenv").config(); // Load environment variables

// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const User = require("../models/User"); // Adjust the path as necessary
// // const nodemailer = require("nodemailer");
// // require("../config/passport-setup"); // Import the passport configuration
// // const passport = require("passport"); // Import passport for Google authentication

// // const router = express.Router();

// // // Environment variables
// // const { EMAIL_USER, EMAIL_PASS, JWT_SECRET } = process.env;

// // // Check if JWT_SECRET is loaded
// // if (!JWT_SECRET) {
// //   console.error("JWT_SECRET is not defined in environment variables.");
// //   process.exit(1); // Exit the application if JWT_SECRET is not set
// // }

// // // Nodemailer setup for sending emails
// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: EMAIL_USER,
// //     pass: EMAIL_PASS,
// //   },
// // });

// // router.get(
// //   "/google",
// //   passport.authenticate("google", { scope: ["profile", "email"] })
// // );

// // // Step 2: Google callback route (GET)
// // router.get(
// //   "/google/callback",
// //   passport.authenticate("google", { failureRedirect: "/login" }),
// //   (req, res) => {
// //     // Successful authentication, redirect to desired route with JWT
// //     const token = jwt.sign({ id: req.user._id }, JWT_SECRET, {
// //       expiresIn: "1h",
// //     });
// //     res.redirect(`/dashboard?token=${token}`); // Redirect to your dashboard or another route
// //   }
// // );

// // // Register a new user
// // router.post("/register", async (req, res) => {
// //   const { name, email, password, phoneNumber } = req.body;

// //   try {
// //     // Check if the user already exists by email
// //     const existingUser = await User.findOne({ email });

// //     if (existingUser) {
// //       return res
// //         .status(400)
// //         .json({ message: "User with this email already exists" });
// //     }

// //     // Hash the password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Create a new user
// //     const newUser = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       phoneNumber,
// //     });

// //     // Save the new user
// //     await newUser.save();

// //     return res.status(201).json({ message: "User registered successfully" });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// // // Login a user
// // router.post("/login", async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     // Find the user by email
// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     // If the user has signed in with Google (googleId exists but no password), prompt to update credentials
// //     if (user.googleId && !user.password) {
// //       return res.status(400).json({
// //         message:
// //           "This account is linked to Google. Please update your password and phone number.",
// //       });
// //     }

// //     // Check if the password matches (for non-Google sign-ins)
// //     const isMatch = await bcrypt.compare(password, user.password);

// //     if (!isMatch) {
// //       return res.status(400).json({ message: "Invalid credentials" });
// //     }

// //     // Generate and return JWT
// //     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
// //     return res.json({ message: "Login successful", token });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// // router.post("/update-credentials", async (req, res) => {
// //   const { email, password, phoneNumber } = req.body;

// //   try {
// //     // Find the user by email
// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     // Ensure the user originally signed in with Google
// //     if (user.googleId && !user.password) {
// //       // Hash the new password
// //       const hashedPassword = await bcrypt.hash(password, 10);

// //       // Update the user's password and phone number
// //       user.password = hashedPassword;
// //       user.phoneNumber = phoneNumber;
// //       await user.save();

// //       return res
// //         .status(200)
// //         .json({ message: "Credentials updated successfully" });
// //     }

// //     return res
// //       .status(400)
// //       .json({ message: "This account does not need credential updates." });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// // // Password reset request
// // router.post("/forgot-password", async (req, res) => {
// //   const { email } = req.body;

// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     // Generate a password reset token
// //     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

// //     // Send password reset email
// //     const resetUrl = `http://localhost:8000/api/auth/reset-password/${token}`;
// //     await transporter.sendMail({
// //       to: email,
// //       subject: "Password Reset Request",
// //       text: `You requested a password reset. Click the link to reset: ${resetUrl}`,
// //     });

// //     return res.status(200).json({ message: "Password reset email sent" });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// // // Reset password
// // router.post("/reset-password/:token", async (req, res) => {
// //   const { password } = req.body;
// //   const { token } = req.params;

// //   try {
// //     const decoded = jwt.verify(token, JWT_SECRET);
// //     const user = await User.findById(decoded.id);

// //     if (!user) {
// //       return res.status(404).json({ message: "User not found" });
// //     }

// //     // Hash the new password
// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     user.password = hashedPassword;

// //     // Save the new password
// //     await user.save();
// //     return res.status(200).json({ message: "Password reset successfully" });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// // module.exports = router;

// require("dotenv").config();
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const nodemailer = require("nodemailer");
// const passport = require("passport");

// const router = express.Router();

// // JWT secret
// const { EMAIL_USER, EMAIL_PASS, JWT_SECRET } = process.env;

// // Nodemailer setup
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS,
//   },
// });

// // Google login route
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     const token = jwt.sign({ id: req.user._id }, JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.redirect(`/dashboard?token=${token}`);
//   }
// );

// // User registration
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // User login
// // User login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     // Log the JWT_SECRET for debugging
//     console.log("JWT_SECRET:", process.env.JWT_SECRET);

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     console.error(error); // Log the error for further investigation
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Forgot password
// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
//     const resetUrl = `http://localhost:8000/api/auth/reset-password/${token}`;

//     await transporter.sendMail({
//       to: email,
//       subject: "Password Reset",
//       text: `Click here to reset your password: ${resetUrl}`,
//     });

//     res.status(200).json({ message: "Password reset email sent" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Reset password
// router.post("/reset-password/:token", async (req, res) => {
//   const { password } = req.body;
//   const { token } = req.params;
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;
//     await user.save();
//     res.status(200).json({ message: "Password reset successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// module.exports = router;
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const passport = require("passport");

const router = express.Router();

// JWT secret and email credentials from env variables
const { EMAIL_USER, EMAIL_PASS, JWT_SECRET } = process.env;

// Nodemailer setup for sending password reset emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// ------------------- Google Login -------------------

// Route to trigger Google sign-in
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route after Google has authenticated the user
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.redirect(`/dashboard?token=${token}`); // Redirect with token
  }
);

// ------------------- User Registration -------------------
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Ensure all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user without googleId
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      googleId: null, // Ensure googleId is explicitly set to null
    });

    // Save the new user
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ------------------- User Login -------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ------------------- Forgot Password -------------------
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    const resetUrl = `http://localhost:8000/api/auth/reset-password/${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      text: `Click here to reset your password: ${resetUrl}`,
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// ------------------- Reset Password -------------------
router.post("/reset-password/:token", async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
