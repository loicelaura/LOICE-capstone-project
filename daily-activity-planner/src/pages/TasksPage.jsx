import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ category: "", priority: "", dueDate: "" });

  // ✅ Function to fetch tasks from Firebase Firestore
  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasksData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasksData);
  };

  // ✅ Fetch tasks when the page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Filter tasks based on user selection
  const filteredTasks = tasks.filter(task =>
    (filters.category ? task.category === filters.category : true) &&
    (filters.priority ? task.priority === filters.priority : true) &&
    (filters.dueDate ? task.dueDate === filters.dueDate : true)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">📌 Task Manager</h1>

      {/* ✅ Add TaskForm with refreshTasks function */}
      <TaskForm refreshTasks={fetchTasks} />

      {/* ✅ Filters UI */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="border p-2 rounded">
          <option value="">📂 All Categories</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, priority: e.target.value })} className="border p-2 rounded">
          <option value="">⚡ All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input 
          type="date" 
          onChange={(e) => setFilters({ ...filters, dueDate: e.target.value })} 
          className="border p-2 rounded" 
        />
      </div>

      {/* ✅ Display Task List with filtering */}
      <TaskList tasks={filteredTasks} refreshTasks={fetchTasks} />
    </div>
  );
};

export default TaskPage;
