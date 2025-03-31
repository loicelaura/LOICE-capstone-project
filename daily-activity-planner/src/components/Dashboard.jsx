import React, { useState } from "react";
import { FaCheckSquare, FaCalendarAlt, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const refreshTasks = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Daily Activity Planner</h1>

      {/* Sections Container */}
      <div className="w-full bg-white py-12 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full px-6">
              
        {/* Task Management Section */}
        <div className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg">
          <FaCheckSquare className="text-white bg-blue-500 p-3 rounded-full text-5xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Task Management</h2>
          <p className="text-gray-600">
            Effortlessly manage your to-dos, create, organize, and prioritize tasks with ease.
          </p>
          <button 
            onClick={() => navigate("/tasks")}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Go to Tasks
          </button>
        </div>

        {/* Calendar & Time Blocking Section */}
        <div className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg">
          <FaCalendarAlt className="text-white bg-blue-500 p-3 rounded-full text-5xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Calendar & Time Blocking</h2>
          <p className="text-gray-600">
            Visualize your day, schedule tasks, block time, and stay on track with our interactive calendar.
          </p>
          <button 
            onClick={() => navigate("/calendar")}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Open Calendar
          </button>
        </div>

        {/* Progress Tracking Section */}
        <div className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg">
          <FaChartBar className="text-white bg-blue-500 p-3 rounded-full text-5xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Progress Tracking</h2>
          <p className="text-gray-600">
            Monitor your success, track progress, celebrate milestones, and stay motivated.
          </p>
          <button 
            onClick={() => navigate("/progress")}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            View Progress
          </button>
        </div>
      </div>

      {/* Footer (moved outside sections) */}
      <footer className="w-full bg-gray-800 text-white py-6 text-center mt-12">
        <p className="text-sm">&copy; {new Date().getFullYear()} Daily Activity Planner. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="/tasks" className="text-gray-500 hover:text-blue-500 hover:underline transition-colors">Tasks</a>
          <a href="/calendar" className="text-gray-500 hover:text-blue-500 hover:underline transition-colors">Calendar</a>
          <a href="/progress" className="text-gray-500 hover:text-blue-500 hover:underline transition-colors">Progress</a>
        </div>
      </footer>
    </div>
    </div>
  );
};

export default Dashboard;
