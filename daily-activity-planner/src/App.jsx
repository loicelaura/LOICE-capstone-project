import React, { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import CallToAction from "./components/CallToAction";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";  
import Signup from "./components/Signup"; 
import CalendarView from "./components/CalendarView";
import TasksPage from "./pages/TasksPage"; 
import ProgressPage from "./pages/ProgressPage"; 
import GoalsPage from "./components/GoalsPage";
import NotesPage from "./components/NotesPage";
import JournalPage from "./components/JournalPage";
import './index.css';

function App() {
    const [tasks, setTasks] = useState([
        { title: "Complete report", dueDate: "2025-04-04", priority: "High" },
        { title: "Doctor's appointment", dueDate: "2025-04-05", priority: "Medium" },
        { title: "Team meeting", dueDate: "2025-04-04", priority: "High" },
    ]);

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />

            <main className="flex flex-col items-center justify-center flex-1">
                <Routes>
                    <Route path="/" element={<CallToAction />} />
                    <Route path="/login" element={<Login />} />  
                    <Route path="/signup" element={<Signup />} />  
                    <Route path="/dashboard" element={<Dashboard />} /> 
                    <Route path="/calendar" element={<CalendarView tasks={tasks} />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/progress" element={<ProgressPage />} /> 
                    <Route path="/goals" element={<GoalsPage />} />
                    <Route path="/journal" element={<JournalPage />} />
                    <Route path="/notes" element={<NotesPage />} />
                </Routes>
            </main>

            <section className="flex flex-col items-center justify-center flex-1">
                <Dashboard />
            </section>
        </div>
    );
}

export default App;
