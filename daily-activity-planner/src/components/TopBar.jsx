import React from "react";
import { Link } from "react-router-dom";

const TopBar = () => {
    return (
        <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
            {/* Logo */}
            <div className="text-2xl font-bold text-gray-900">Activity Planner</div>
            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-6">
                <Link to="/tasks" className="text-gray-700 hover:text-blue-500">Tasks</Link>
                <Link to="/goals" className="text-gray-700 hover:text-blue-500">Goals</Link>
                <Link to="/notes" className="text-gray-700 hover:text-blue-500">Notes</Link>
                <Link to="/journal" className="text-gray-700 hover:text-blue-500">Journal</Link>
                <Link to="/settings" className="text-gray-700 hover:text-blue-500">Settings</Link>
            </nav>

            {/* Login & Sign Up */}
            <div className="space-x-4">
                <Link to="/login" className="text-blue-500 font-medium">Login</Link>
                <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</Link>
            </div>
        </header>
    );
};

export default TopBar;
