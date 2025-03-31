import React, { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../firebaseTasks";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const toggleComplete = async (task) => {
        await updateTask(task.id, { completed: !task.completed });
        fetchTasks(); // Refresh tasks
    };

    const handleDelete = async (taskId) => {
        await deleteTask(taskId);
        fetchTasks(); // Refresh tasks
    };

    const calculateCompletionRate = (tasks) => {
        if (tasks.length === 0) return 0;  // Avoid division by zero
        const completedTasks = tasks.filter(task => task.completed).length;
        return Math.round((completedTasks / tasks.length) * 100); // Return % value
    };

    const completionRate = calculateCompletionRate(tasks);

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            {/* ✅ Task Completion Progress Bar */}
            <div className="bg-white p-4 rounded shadow-md mb-4">
                <h2 className="text-lg font-semibold mb-2">Task Completion</h2>
                <div className="relative w-full bg-gray-200 h-4 rounded">
                    <div 
                        className="bg-blue-500 h-4 rounded" 
                        style={{ width: `${completionRate}%` }}>
                    </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">
                    {completionRate}% tasks completed
                </p>
            </div>

            {/* ✅ Task List */}
            <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="p-3 border-b hover:bg-gray-200 cursor-pointer transition-colors">
                        <div>
                            <p className="font-semibold">{task.title}</p>
                            <p className="text-sm text-gray-600">{task.dueDate} | {task.priority}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleComplete(task)}
                                className="h-5 w-5"
                            />
                            <button 
                                onClick={() => handleDelete(task.id)} 
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
