import React from "react";
import { useDrag } from "react-dnd";
import axios from "axios";

const TaskCard = ({ task, setTaskToEdit, fetchTasks }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 bg-white shadow rounded mb-4 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>Due Date: {task.dueDate}</p>
      <div className="mt-4">
        <button
          onClick={() => setTaskToEdit(task)} // Set task for editing
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={async () => {
            await axios.delete(`http://localhost:8000/api/tasks/${task._id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            fetchTasks(); // Refresh the task list after deleting
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
