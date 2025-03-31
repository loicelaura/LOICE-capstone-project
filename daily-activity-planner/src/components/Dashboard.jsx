import React from "react";
import { FaCheckSquare, FaCalendarAlt, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Daily Activity Planner</h1>

      {/* Sections Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        
        {/* Task Management Section */}
        <div className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center">
          <FaCheckSquare className="text-blue-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Task Management</h2>
          <p className="text-gray-600">
            Effortlessly manage your to-dos, create, organize, and prioritize tasks with ease.
          </p>
          <button 
            onClick={() => navigate("/tasks")}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to Tasks
          </button>
        </div>

        {/* Calendar & Time Blocking Section */}
        <div className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center">
          <FaCalendarAlt className="text-blue-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Calendar & Time Blocking</h2>
          <p className="text-gray-600">
            Visualize your day, schedule tasks, block time, and stay on track with our interactive calendar.
          </p>
          <button 
            onClick={() => navigate("/calendar")}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Open Calendar
          </button>
        </div>

        {/* Progress Tracking Section */}
        <div className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center">
          <FaChartBar className="text-blue-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Progress Tracking</h2>
          <p className="text-gray-600">
            Monitor your success, track progress, celebrate milestones, and stay motivated.
          </p>
          <button 
            onClick={() => navigate("/progress")}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Progress
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
