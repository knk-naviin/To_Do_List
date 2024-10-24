import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";

const TaskList = ({ tasks = [], fetchTasks }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Task key={task._id} task={task} fetchTasks={fetchTasks} />
        ))
      ) : (
        <p className="text-gray-600">No tasks available. Add some!</p>
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  fetchTasks: PropTypes.func.isRequired,
};

export default TaskList;
