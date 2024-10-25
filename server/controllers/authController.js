// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const passport = require("passport");

// exports.register = async (req, res) => {
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
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.googleAuth = (req, res, next) => {
//   passport.authenticate("google", { scope: ["profile", "email"] })(
//     req,
//     res,
//     next
//   );
// };
// exports.googleCallback = (req, res) => {
//   console.log("Authenticated user:", req.user); // Debugging line

//   if (!req.user) {
//     return res
//       .status(401)
//       .json({ message: "Authentication failed, user not found." });
//   }

//   const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });
//   res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
// };

// // exports.getUser = async (req, res) => {
// //   const user = await User.findById(req.user.id);
// //   if (!user) {
// //     return res.status(401).json({ message: "User not authenticated" });
// //   }
// //   res.status(200).json(user);
// // };
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Registration function
exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    // Generate and return token
    const token = generateToken(newUser._id);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Ensure that password exists before comparing
    if (!user.password) {
      return res.status(400).json({ message: "No password set for this user" });
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate and return JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Google OAuth redirect
exports.googleAuth = (req, res) => {
  res.redirect("/dashboard");
};

// Google OAuth callback with token generation
exports.googleCallback = (req, res) => {
  const token = generateToken(req.user._id);
  res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
};
