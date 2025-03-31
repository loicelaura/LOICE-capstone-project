import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
        <div className="flex flex-col items-center text-center px-6 py-24 bg-blue-500 text-white w-full ">
            {/* Main Heading */}
            <h2 className="text-4xl font-bold mb-4">Take control of your day.</h2>

            {/* Description */}
            <p className="text-lg text-gray-200 max-w-2xl mb-6">
                Plan your activities, track progress, and achieve goals with our intuitive planner.
            </p>

            {/* Get Started Button */}
            <Link to="/signup" className="bg-white text-pink-500 font-semibold py-3 px-6 rounded-lg">
                Get Started Now
            </Link>
        </div>
    );
};

export default CallToAction;
