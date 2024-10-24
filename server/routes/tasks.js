const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/Auth");
const router = express.Router();

// Add a new task
router.post("/", auth, async (req, res) => {
  const { title, dueDate } = req.body;

  // Validate the input data
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const task = new Task({ userId: req.user.id, title, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
});

// Get all tasks for a user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// Get a specific task by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a task
router.put("/:id", auth, async (req, res) => {
  const { title, dueDate } = req.body;

  // Ensure req.user.id is valid before proceeding
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists and belongs to the user
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update task details
    task.title = title || task.title; // Only update if new title is provided
    task.dueDate = dueDate || task.dueDate; // Only update if new dueDate is provided
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists and belongs to the user
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
