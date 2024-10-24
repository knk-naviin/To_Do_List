const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
