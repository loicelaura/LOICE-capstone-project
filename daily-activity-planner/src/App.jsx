import React from "react";
import TopBar from "./components/TopBar";
import CallToAction from "./components/CallToAction";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";  
import Signup from "./components/Signup"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import CalendarView from "./components/CalendarView";
import TasksPage from "./pages/TasksPage"; 
import ProgressPage from "./pages/ProgressPage"; 
import './index.css';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation Bar */}
            <TopBar />

            {/* main section */}
            <main className="flex flex-col items-center justify-center flex-1">
            <Routes>
                        <Route path="/" element={<CallToAction />} />
                        <Route path="/login" element={<Login />} />  
                        <Route path="/signup" element={<Signup />} />  
                        <Route path="/dashboard" element={<Dashboard />} /> 
                        <Route path="/calendar" element={<CalendarView />} />
                        <Route path="/tasks" element={<TasksPage />} />
                        <Route path="/progress" element={<ProgressPage />} /> 
                    </Routes>
              
            </main>

            {/* Dashboard Section */}
            <section className="flex flex-col items-center justify-center flex-1">
                <Dashboard />
            </section>
        </div>
    );
}

export default App;
