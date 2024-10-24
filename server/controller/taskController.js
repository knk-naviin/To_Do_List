const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description, column } = req.body;
  if (!title || !column)
    return res.status(400).json({ message: "Title and column are required" });

  const task = await Task.create({
    title,
    description,
    column,
    userId: req.user._id,
  });

  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, column } = req.body;
  const task = await Task.findById(id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  task.title = title || task.title;
  task.description = description || task.description;
  task.column = column || task.column;

  await task.save();
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  await task.remove();
  res.json({ message: "Task removed" });
};
