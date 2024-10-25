const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["todo", "in-progress", "completed"],
    default: "todo",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Add a virtual field to format dueDate
taskSchema.virtual("formattedDueDate").get(function () {
  const date = new Date(this.dueDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
});

// Ensure virtual fields are included when converting to JSON
taskSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Task", taskSchema);
