import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSaveTask, editingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setAssignedTo(editingTask.assignedTo);
      setPriority(editingTask.priority);
      setTags(editingTask.tags);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveTask({ title, description, assignedTo, priority, tags });
    setTitle('');
    setDescription('');
    setAssignedTo('');
    setPriority('Medium');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
      <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="Assign To" />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)" />
      <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
