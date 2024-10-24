const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/Auth");
const router = express.Router();

// Helper function to ensure date is correctly formatted
const formatDate = (date) => {
  const d = new Date(date);
  if (isNaN(d)) throw new Error("Invalid Date");
  return d.toISOString(); // Ensure ISO 8601 format for MongoDB
};

// -------------------- Create Task --------------------
router.post("/", auth, async (req, res) => {
  const { title, dueDate } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ error: "Title and due date are required" });
  }

  try {
    const formattedDueDate = formatDate(dueDate); // Ensure valid date
    const task = new Task({
      userId: req.user.id,
      title,
      dueDate: formattedDueDate,
      status: "todo", // Default status is 'todo'
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Error creating task" });
  }
});

// -------------------- Get All Tasks for a User --------------------
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    if (!tasks) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// -------------------- Update a Task --------------------
router.put("/:id", auth, async (req, res) => {
  const { title, dueDate, status } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.title = title || task.title;
    task.dueDate = dueDate ? formatDate(dueDate) : task.dueDate;
    task.status = status || task.status;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
});

// -------------------- Delete a Task --------------------
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(404).json({ error: "Task not found" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

module.exports = router;
