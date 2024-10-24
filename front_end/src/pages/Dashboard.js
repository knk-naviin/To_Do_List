import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { DragDropContext } from "react-beautiful-dnd";

const Dashboard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTasks = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get("http://localhost:8000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { todo, inProgress, done } = categorizeTasks(response.data);
      setTasks({ todo, inProgress, done });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const categorizeTasks = (tasks) => {
    const todo = tasks.filter((task) => task.status === "todo");
    const inProgress = tasks.filter((task) => task.status === "inProgress");
    const done = tasks.filter((task) => task.status === "done");
    return { todo, inProgress, done };
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    // If the item is dropped outside the list or in the same position
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    // Logic to move the task from one column to another or reorder within the same column
    const newTasks = { ...tasks };

    const [movedTask] = newTasks[sourceColumn].splice(source.index, 1);
    newTasks[destColumn].splice(destination.index, 0, movedTask);

    setTasks(newTasks);

    // Here you might want to send the new order to your backend
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/auth";
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search Tasks..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded px-3 py-2 w-1/2"
        />
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white rounded px-4 py-2"
        >
          Logout
        </button>
      </div>
      <TaskForm fetchTasks={fetchTasks} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="task-columns grid grid-cols-3 gap-4">
          <div className="column">
            <h2 className="text-xl font-bold">To Do</h2>
            <TaskList tasks={tasks.todo} fetchTasks={fetchTasks} />
          </div>
          <div className="column">
            <h2 className="text-xl font-bold">In Progress</h2>
            <TaskList tasks={tasks.inProgress} fetchTasks={fetchTasks} />
          </div>
          <div className="column">
            <h2 className="text-xl font-bold">Done</h2>
            <TaskList tasks={tasks.done} fetchTasks={fetchTasks} />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
