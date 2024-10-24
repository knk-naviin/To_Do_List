import React, { useState } from "react";
import axios from "axios";

const Task = ({ task, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const token = localStorage.getItem("authToken");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${task.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/tasks/${task.id}`,
        { title: newTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="border border-gray-300 rounded p-2 mb-2">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-2 py-1"
          >
            Update
          </button>
        </form>
      ) : (
        <>
          <h3 className="font-semibold">{task.title}</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 underline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 underline ml-2"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Task;
