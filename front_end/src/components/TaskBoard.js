import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const moveTask = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8000/api/tasks/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error moving task", error);
    }
  };

  const [, dropToDo] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, "todo"),
  });

  const [, dropInProgress] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, "in-progress"),
  });

  const [, dropCompleted] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, "completed"),
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      <div ref={dropToDo} className="p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">To Do</h2>
        {tasks
          .filter((task) => task.status === "todo")
          .map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              setTaskToEdit={setTaskToEdit}
              fetchTasks={fetchTasks}
            />
          ))}
      </div>
      <div ref={dropInProgress} className="p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">In Progress</h2>
        {tasks
          .filter((task) => task.status === "in-progress")
          .map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              setTaskToEdit={setTaskToEdit}
              fetchTasks={fetchTasks}
            />
          ))}
      </div>
      <div ref={dropCompleted} className="p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Completed</h2>
        {tasks
          .filter((task) => task.status === "completed")
          .map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              setTaskToEdit={setTaskToEdit}
              fetchTasks={fetchTasks}
            />
          ))}
      </div>

      {/* Task Form */}
      <TaskForm
        fetchTasks={fetchTasks}
        taskToEdit={taskToEdit}
        clearEdit={() => setTaskToEdit(null)}
      />
    </div>
  );
};

export default TaskBoard;
