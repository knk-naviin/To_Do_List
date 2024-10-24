import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";

const TaskList = ({ tasks = [], fetchTasks }) => {
  return (
    <Droppable droppableId="droppable">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="p-2 border border-gray-300 rounded"
        >
          {tasks.length === 0 ? (
            <div className="text-gray-500">No tasks available</div>
          ) : (
            tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-2" // Add some margin between tasks
                  >
                    <Task task={task} fetchTasks={fetchTasks} />
                  </div>
                )}
              </Draggable>
            ))
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
