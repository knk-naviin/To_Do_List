import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/taskService";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null); // Manage task being edited

  // Fetch tasks on component load
  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks(); // Load tasks on initial render
  }, []);

  // Handle drag and drop functionality
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks); // Update the task order in state
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Task Manager</h1>

        {/* Task Form for Adding or Editing a Task */}
        <TaskForm
          fetchTasks={loadTasks} // Function to reload tasks after add/edit
          taskToEdit={taskToEdit} // Task being edited
          clearEdit={() => setTaskToEdit(null)} // Clear edit mode after saving
        />

        {/* Task Board with Drag-and-Drop */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-3 gap-4"
              >
                {tasks.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          task={task}
                          setTaskToEdit={setTaskToEdit} // Function to set task for editing
                          fetchTasks={loadTasks} // Function to reload tasks after delete
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Dashboard;
