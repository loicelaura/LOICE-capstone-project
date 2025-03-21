import React, { useState } from 'react';
import { db, auth } from '../firebase'; // Adjust the import path for firebase.js
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (!auth.currentUser) {
        setError('You must be logged in to add tasks.');
        return;
      }
      await addDoc(collection(db, 'tasks'), {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        category,
        completed: false,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('low');
      setCategory('');
      console.log('Task added!');
    } catch (err) {
      setError(err.message);
      console.error('Task creation error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          placeholder="Task title"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          placeholder="Task description"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          placeholder="Category"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;