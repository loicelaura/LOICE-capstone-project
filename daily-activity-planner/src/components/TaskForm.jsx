import React, { useState } from "react";
import { addTask } from "../firebaseTasks";

const TaskForm = ({ refreshTasks }) => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
        category: "Personal",
        completed: false,
    });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTask(task);
        refreshTasks(); // Refresh task list
        setTask({ title: "", description: "", dueDate: "", priority: "Low", category: "Personal", completed: false });
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Task Title" className="w-full p-2 border mb-2" required />
            <textarea name="description" value={task.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border mb-2" />
            <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} className="w-full p-2 border mb-2" required />
            <select name="priority" value={task.priority} onChange={handleChange} className="w-full p-2 border mb-2">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button type="submit" className="w-full bg-blue-500 text-white py-2">Add Task</button>
        </form>
    );
};

export default TaskForm;
