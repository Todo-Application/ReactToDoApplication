import React from 'react';

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <div>
      <h2>Task List</h2>
      {tasks.map(task => (
        <div key={task.id} className="card">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Assigned to: {task.assignedTo}</p>
          <p>Priority: {task.priority}</p>
          <p>Tags: {task.tags}</p>
          <button onClick={() => onEditTask(task)}>Edit</button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;