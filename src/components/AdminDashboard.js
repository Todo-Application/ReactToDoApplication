import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import TaskForm from './TaskForm';
import TaskList from './TaskList';


const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    });
    return unsubscribe;
  }, []);

 
  const handleSaveTask = async (task) => {
    if (editingTask) {
      const taskRef = doc(db, 'tasks', editingTask.id);
      await updateDoc(taskRef, task);
      setEditingTask(null);
    } else {
      await addDoc(collection(db, 'tasks'), task);
    }
  };

  
  const handleDeleteTask = async (taskId) => {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>    
      <TaskForm onSaveTask={handleSaveTask} editingTask={editingTask} />
      <TaskList tasks={tasks} onEditTask={setEditingTask} onDeleteTask={handleDeleteTask} />
    </div>
  );
};

export default AdminDashboard;