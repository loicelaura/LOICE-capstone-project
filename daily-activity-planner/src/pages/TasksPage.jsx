import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import React, { useEffect, useState } from "react";


const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from Firebase Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tasksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskPage;