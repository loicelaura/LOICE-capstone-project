import React, { useState } from "react";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Modal from "react-modal";

// Required for modal accessibility
Modal.setAppElement("#root");

const TaskList = ({ tasks, refreshTasks }) => {
    const [editingTask, setEditingTask] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [filters, setFilters] = useState({ category: "", priority: "", dueDate: "" });

    // ✅ Toggle task completion
    const toggleComplete = async (task) => {
        await updateDoc(doc(db, "tasks", task.id), { completed: !task.completed });
        refreshTasks();
    };

    // ✅ Handle task deletion
    const handleDelete = async (taskId) => {
        await deleteDoc(doc(db, "tasks", taskId));
        refreshTasks();
    };

    // ✅ Handle task editing (open modal)
    const handleEdit = (task) => {
        setEditingTask(task);
        setModalIsOpen(true);
    };

    // ✅ Save edited task
    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, "tasks", editingTask.id), {
            title: editingTask.title,
            category: editingTask.category,
            priority: editingTask.priority,
            dueDate: editingTask.dueDate,
        });
        setModalIsOpen(false);
        refreshTasks();
    };

    // ✅ Calculate completion rate
    const calculateCompletionRate = (tasks) => {
        if (tasks.length === 0) return 0;
        const completedTasks = tasks.filter(task => task.completed).length;
        return Math.round((completedTasks / tasks.length) * 100);
    };

    const completionRate = calculateCompletionRate(tasks);

    // ✅ Filter tasks based on selected filters
    const filteredTasks = tasks.filter(task =>
        (filters.category ? task.category === filters.category : true) &&
        (filters.priority ? task.priority === filters.priority : true) &&
        (filters.dueDate ? task.dueDate === filters.dueDate : true)
    );

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            {/* ✅ Task Completion Progress Bar */}
            <div className="bg-white p-4 rounded shadow-md mb-4">
                <h2 className="text-lg font-semibold mb-2">Task Completion</h2>
                <div className="relative w-full bg-gray-200 h-4 rounded">
                    <div className="bg-blue-500 h-4 rounded" style={{ width: `${completionRate}%` }}></div>
                </div>
                <p className="mt-2 text-sm text-gray-700">{completionRate}% tasks completed</p>
            </div>

            {/* ✅ Filters */}
            <div className="flex gap-4 mb-4">
                <select onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="border p-2">
                    <option value="">All Categories</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                </select>

                <select onChange={(e) => setFilters({ ...filters, priority: e.target.value })} className="border p-2">
                    <option value="">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <input type="date" onChange={(e) => setFilters({ ...filters, dueDate: e.target.value })} className="border p-2" />
            </div>

            {/* ✅ Task List */}
            <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
            <ul>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <li key={task.id} className="p-3 border-b hover:bg-gray-200 cursor-pointer transition-colors flex justify-between items-center">
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
                                <button onClick={() => handleEdit(task)} className="text-blue-500">Edit</button>
                                <button onClick={() => handleDelete(task.id)} className="text-red-500">Delete</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No tasks available.</p>
                )}
            </ul>

            {/* ✅ Edit Task Modal */}
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                    <label className="text-sm font-semibold">Title</label>
                    <input
                        type="text"
                        value={editingTask?.title || ""}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        className="border p-2 rounded"
                    />

                    <label className="text-sm font-semibold">Category</label>
                    <select
                        value={editingTask?.category || ""}
                        onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
                        className="border p-2 rounded"
                    >
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                    </select>

                    <label className="text-sm font-semibold">Priority</label>
                    <select
                        value={editingTask?.priority || ""}
                        onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                        className="border p-2 rounded"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    <label className="text-sm font-semibold">Due Date</label>
                    <input
                        type="date"
                        value={editingTask?.dueDate || ""}
                        onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                        className="border p-2 rounded"
                    />

                    <button type="submit" className="bg-green-500 text-white py-2 rounded">Save Changes</button>
                </form>
                <button onClick={() => setModalIsOpen(false)} className="mt-3 bg-gray-500 text-white py-2 rounded">Cancel</button>
            </Modal>
        </div>
    );
};

export default TaskList;
