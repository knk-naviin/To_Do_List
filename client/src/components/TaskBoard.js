// // import React, { useState, useEffect } from "react";
// // import { getTasks, updateTask, deleteTask } from "./utils/api";
// // import TaskForm from "./TaskForm";

// // // Helper function to format date to DD/MM/YYYY
// // const formatDate = (dateString) => {
// //   const date = new Date(dateString);
// //   const day = String(date.getDate()).padStart(2, "0");
// //   const month = String(date.getMonth() + 1).padStart(2, "0");
// //   const year = date.getFullYear();
// //   return `${day}/${month}/${year}`;
// // };

// // const TaskBoard = () => {
// //   const [tasks, setTasks] = useState([]);
// //   const [selectedTask, setSelectedTask] = useState(null);
// //   const [showTaskForm, setShowTaskForm] = useState(false);

// //   useEffect(() => {
// //     fetchTasks();
// //   }, []);

// //   const fetchTasks = async () => {
// //     try {
// //       const { data } = await getTasks();
// //       setTasks(data);
// //     } catch (error) {
// //       console.error("Error fetching tasks:", error);
// //     }
// //   };

// //   const handleDrop = async (task, newStatus) => {
// //     try {
// //       await updateTask(task._id, { status: newStatus });
// //       fetchTasks();
// //     } catch (error) {
// //       console.error("Error updating task:", error);
// //     }
// //   };

// //   const handleDeleteTask = async (taskId) => {
// //     try {
// //       await deleteTask(taskId);
// //       fetchTasks();
// //     } catch (error) {
// //       console.error("Error deleting task:", error);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center">
// //       <button
// //         onClick={() => setShowTaskForm(true)}
// //         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
// //       >
// //         Add New Task
// //       </button>

// //       {showTaskForm && (
// //         <TaskForm
// //           onSave={() => {
// //             fetchTasks();
// //             setShowTaskForm(false); // Close form after saving
// //             setSelectedTask(null); // Clear selected task
// //           }}
// //           task={selectedTask}
// //           onClose={() => setShowTaskForm(false)}
// //         />
// //       )}

// //       <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
// //         {/* To-Do Column */}
// //         <div className="p-4 bg-gray-200 rounded-lg shadow-md">
// //           <h2 className="text-xl font-bold mb-4 text-center">To-Do</h2>
// //           {tasks
// //             .filter((task) => task.status === "todo")
// //             .map((task) => (
// //               <div key={task._id} className="bg-white p-4 mb-4 shadow rounded">
// //                 <h3 className="font-bold">{task.title}</h3>
// //                 <p>{task.description}</p>
// //                 <p>Due: {formatDate(task.dueDate)}</p>
// //                 <button
// //                   onClick={() => setSelectedTask(task) || setShowTaskForm(true)}
// //                   className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   onClick={() => handleDeleteTask(task._id)}
// //                   className="bg-red-500 text-white px-2 py-1 rounded"
// //                 >
// //                   Delete
// //                 </button>
// //                 <button
// //                   onClick={() => handleDrop(task, "completed")}
// //                   className="bg-green-500 text-white px-2 py-1 rounded mt-2"
// //                 >
// //                   Mark as Completed
// //                 </button>
// //               </div>
// //             ))}
// //         </div>

// //         {/* Completed Column */}
// //         <div className="p-4 bg-gray-200 rounded-lg shadow-md">
// //           <h2 className="text-xl font-bold mb-4 text-center">Completed</h2>
// //           {tasks
// //             .filter((task) => task.status === "completed")
// //             .map((task) => (
// //               <div key={task._id} className="bg-white p-4 mb-4 shadow rounded">
// //                 <h3 className="font-bold">{task.title}</h3>
// //                 <p>{task.description}</p>
// //                 <p>Due: {formatDate(task.dueDate)}</p>
// //                 <button
// //                   onClick={() => handleDeleteTask(task._id)}
// //                   className="bg-red-500 text-white px-2 py-1 rounded"
// //                 >
// //                   Delete
// //                 </button>
// //                 <button
// //                   onClick={() => handleDrop(task, "todo")}
// //                   className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
// //                 >
// //                   Move to To-Do
// //                 </button>
// //               </div>
// //             ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TaskBoard;
// import React, { useState, useEffect } from "react";
// import { getTasks, updateTask, deleteTask } from "./utils/api";
// import TaskForm from "./TaskForm";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// // Helper function to format date to DD/MM/YYYY
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// };

// // Task Item Component
// const TaskItem = ({ task, onEdit, onDelete, onDropTask }) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: "task",
//     item: { id: task._id, status: task.status },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       className={`bg-white p-4 mb-4 shadow rounded ${
//         isDragging ? "opacity-50" : "opacity-100"
//       }`}
//       style={{ cursor: "move" }}
//     >
//       <h3 className="font-bold">{task.title}</h3>
//       <p>{task.description}</p>
//       <p>Due: {formatDate(task.dueDate)}</p>
//       <button
//         onClick={() => onEdit(task)}
//         className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
//       >
//         Edit
//       </button>
//       <button
//         onClick={() => onDelete(task._id)}
//         className="bg-red-500 text-white px-2 py-1 rounded"
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

// // Column Component
// const TaskColumn = ({ title, status, tasks, onDropTask }) => {
//   const [, drop] = useDrop({
//     accept: "task",
//     drop: (item) => onDropTask(item.id, status),
//   });

//   return (
//     <div ref={drop} className="p-4 bg-gray-200 rounded-lg shadow-md w-full">
//       <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
//       {tasks.map((task) => (
//         <TaskItem key={task._id} task={task} onDropTask={onDropTask} />
//       ))}
//     </div>
//   );
// };

// const TaskBoard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [showTaskForm, setShowTaskForm] = useState(false);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const { data } = await getTasks();
//       setTasks(data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const handleDropTask = async (taskId, newStatus) => {
//     try {
//       await updateTask(taskId, { status: newStatus });
//       fetchTasks();
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const handleDeleteTask = async (taskId) => {
//     try {
//       await deleteTask(taskId);
//       fetchTasks();
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="flex flex-col items-center">
//         <button
//           onClick={() => setShowTaskForm(true)}
//           className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         >
//           Add New Task
//         </button>

//         {showTaskForm && (
//           <TaskForm
//             onSave={() => {
//               fetchTasks();
//               setShowTaskForm(false);
//               setSelectedTask(null);
//             }}
//             task={selectedTask}
//             onClose={() => setShowTaskForm(false)}
//           />
//         )}

//         <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
//           <TaskColumn
//             title="To-Do"
//             status="todo"
//             tasks={tasks.filter((task) => task.status === "todo")}
//             onDropTask={handleDropTask}
//           />
//           <TaskColumn
//             title="Completed"
//             status="completed"
//             tasks={tasks.filter((task) => task.status === "completed")}
//             onDropTask={handleDropTask}
//           />
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default TaskBoard;
import React, { useState, useEffect } from "react";
import { getTasks, updateTask, deleteTask } from "./utils/api";
import TaskForm from "./TaskForm";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Helper function to format date to DD/MM/YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Task Item Component
const TaskItem = ({ task, onEdit, onDelete, onDropTask, onComplete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-white p-4 mb-4 shadow rounded ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      style={{ cursor: "move" }}
    >
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {formatDate(task.dueDate)}</p>
      <button
        onClick={() => onEdit(task)}
        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(task._id)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
      {task.status === "todo" && (
        <button
          onClick={() => onComplete(task._id)}
          className="bg-green-500 text-white px-2 py-1 rounded mt-2"
        >
          Mark as Completed
        </button>
      )}
    </div>
  );
};

// Task Column Component
const TaskColumn = ({
  title,
  status,
  tasks,
  onDropTask,
  onComplete,
  onDelete,
  onEdit,
}) => {
  const [, drop] = useDrop({
    accept: "task",
    drop: (item) => onDropTask(item.id, status),
  });

  return (
    <div ref={drop} className="p-4 bg-gray-200 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete} // Pass onDelete prop here
          onEdit={onEdit} // Pass onEdit prop here
        />
      ))}
    </div>
  );
};

// Task Board Component
const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDropTask = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await updateTask(taskId, { status: "completed" });
      fetchTasks();
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const handleEditTask = (task) => {
    console.log("Editing task:", task); // Log task to be edited

    setSelectedTask(task);
    setShowTaskForm(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center">
        <button
          onClick={() => setShowTaskForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add New Task
        </button>

        {showTaskForm && (
          <TaskForm
            onSave={() => {
              fetchTasks();
              setShowTaskForm(false);
              setSelectedTask(null);
            }}
            task={selectedTask}
            onClose={() => setShowTaskForm(false)}
          />
        )}

        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
          <TaskColumn
            title="To-Do"
            status="todo"
            tasks={tasks.filter((task) => task.status === "todo")}
            onDropTask={handleDropTask}
            onComplete={handleCompleteTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
          <TaskColumn
            title="Completed"
            status="completed"
            tasks={tasks.filter((task) => task.status === "completed")}
            onDropTask={handleDropTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
