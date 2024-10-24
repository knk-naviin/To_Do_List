const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  googleId: { type: String },
  resetToken: String, // For password reset
  resetTokenExpiration: Date, // Expiration for the toke
});

module.exports = mongoose.model("User", userSchema);
