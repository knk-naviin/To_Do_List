// import React, { useState, useEffect } from "react";
// import { createTask, updateTask } from "./utils/api";

// const TaskForm = ({ task, onSave, onClose }) => {
//   const [title, setTitle] = useState(task?.title || "");
//   const [description, setDescription] = useState(task?.description || "");
//   const [dueDate, setDueDate] = useState(task?.dueDate || "");

//   useEffect(() => {
//     if (task) {
//       setTitle(task.title);
//       setDescription(task.description);
//       setDueDate(task.dueDate);
//     }
//   }, [task]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const taskData = { title, description, dueDate, status: "todo" };

//     try {
//       if (task) {
//         await updateTask(task._id, taskData);
//       } else {
//         await createTask(taskData);
//       }
//       onSave();
//     } catch (error) {
//       console.error("Error saving task:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">
//           {task ? "Edit Task" : "Add Task"}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 mb-4 border rounded"
//             required
//           />
//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 mb-4 border rounded"
//           />
//           <input
//             type="date"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//             className="w-full p-2 mb-4 border rounded"
//             required
//           />
//           <div className="flex justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               {task ? "Update Task" : "Create Task"}
//             </button>
//             <button
//               onClick={onClose}
//               type="button"
//               className="bg-gray-300 px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TaskForm;
import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "./utils/api";

const TaskForm = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, dueDate, status: "todo" };

    try {
      if (task) {
        await updateTask(task._id, taskData);
      } else {
        await createTask(taskData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {task ? "Update Task" : "Create Task"}
            </button>
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
