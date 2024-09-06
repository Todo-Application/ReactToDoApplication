import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AddTask = () => {
  const [task, setTask] = useState('');

  const handleAddTask = async () => {
    try {
      await addDoc(collection(db, 'tasks'), { task, completed: false });
      alert('Task added successfully!');
      setTask('');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Error adding task. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Task" />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;