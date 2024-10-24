import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const token = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/tasks",
        { title: taskTitle, status: "todo" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTaskTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="New Task Title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        required
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      />
      <button
        type="submit"
        className="bg-green-500 text-white rounded px-4 py-2"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
