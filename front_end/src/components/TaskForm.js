import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      await axios.post(
        "http://localhost:8000/api/tasks",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      fetchTasks(); // Refresh the task list after creating a new task
    } catch (error) {
      console.error(error);
      alert("Error creating task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
