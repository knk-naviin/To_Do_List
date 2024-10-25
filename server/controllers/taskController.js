const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const task = new Task({ title, description, dueDate, userId: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).lean({
      virtuals: true,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
