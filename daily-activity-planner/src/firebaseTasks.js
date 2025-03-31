import { db } from "./firebase"; // Import Firebase setup
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const tasksCollection = collection(db, "tasks");

// Fetch tasks
export const getTasks = async () => {
    const snapshot = await getDocs(tasksCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add a task
export const addTask = async (task) => {
    await addDoc(tasksCollection, task);
};

// Update task (mark as complete, edit, etc.)
export const updateTask = async (taskId, updatedData) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updatedData);
};

// Delete task
export const deleteTask = async (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
};
