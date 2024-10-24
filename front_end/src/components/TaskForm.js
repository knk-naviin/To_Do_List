import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks, taskToEdit, clearEdit }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDueDate(taskToEdit.dueDate);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskToEdit) {
        await axios.put(`http://localhost:8000/api/tasks/${taskToEdit._id}`, {
          title,
          dueDate,
        });
        clearEdit(); // Clear edit mode after saving
      } else {
        await axios.post(
          "http://localhost:8000/api/tasks",
          { title, dueDate },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      fetchTasks(); // Reload task list after add/edit
      setTitle("");
      setDueDate("");
    } catch (error) {
      console.error("Error adding/editing task", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-xl font-bold mb-4">
        {taskToEdit ? "Edit Task" : "Add Task"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Due Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {taskToEdit ? "Save Changes" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
