import React from "react";
import axios from "axios";

const Task = ({ task, fetchTasks }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Refresh task list after deleting a task
    } catch (error) {
      console.error(error);
      alert("Error deleting task");
    }
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 mb-2 rounded">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white rounded px-3 py-1"
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
