import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, updateDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import DarkModeToggle from './DarkModeToggle';

const UserDashboard = ({ currentUser }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ priority: '', tags: '' });

  useEffect(() => {
    if (!currentUser) {
      console.log("No currentUser found");
      return; 
    }

    console.log("currentUser:", currentUser.email);

    const tasksQuery = query(collection(db, 'tasks'), where('assignedTo', '==', currentUser.email));
    
    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Fetched tasks: ", tasksData);
      setTasks(tasksData);
    }, (error) => {
      console.error("Error fetching tasks: ", error); 
      toast.error("Failed to load tasks.");
    });

    return unsubscribe;
  }, [currentUser]);

  const handleCompleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, { completed: true });
      toast.success("Task marked as completed!");
    } catch (error) {
      console.error("Error updating task: ", error);
      toast.error("Failed to mark task as completed.");
    }
  };

  const filteredTasks = tasks.filter(task => {
    return (!filter.priority || task.priority === filter.priority) &&
           (!filter.tags || task.tags.includes(filter.tags));
  });

  if (!currentUser) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container">
      <h1>User Dashboard</h1>
      <DarkModeToggle />
      
      <div className="filter-section">
        <select onChange={(e) => setFilter({ ...filter, priority: e.target.value })}>
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
          type="text"
          placeholder="Filter by tags"
          onChange={(e) => setFilter({ ...filter, tags: e.target.value })}
        />
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className={`card ${task.completed ? 'completed-task' : ''}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Tags: {task.tags}</p>
              <button
                onClick={() => handleCompleteTask(task.id)}
                disabled={task.completed}
              >
                {task.completed ? "Completed" : "Mark as Completed"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;