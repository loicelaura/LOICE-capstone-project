import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) {
      setError('You must be logged in to view tasks.');
      setLoading(false);
      return;
    }

    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef, where('userId', '==', auth.currentUser.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const taskList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskList);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Unsubscribe on unmount
  }, []);

  const handleComplete = async (taskId, completed) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), {
        completed: !completed,
      });
    } catch (error) {
      console.error('Error updating task:', error);
      setError(error.message);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-2 border rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                {task.dueDate && (
                  <p className="text-xs text-gray-500">
                    Due: {task.dueDate.toDate().toLocaleDateString()}
                  </p>
                )}
              </div>
              <span className={`text-xs px-2 py-1 rounded ${task.priority === 'high' ? 'bg-red-200 text-red-700' : task.priority === 'medium' ? 'bg-yellow-200 text-yellow-700' : 'bg-green-200 text-green-700'}`}>
                {task.priority}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  className="text-sm text-blue-500"
                  onClick={() => handleComplete(task.id, task.completed)}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  className="text-sm text-red-500"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;