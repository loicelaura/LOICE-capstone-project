import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarView = ({ tasks }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Function to filter tasks by selected date
    const tasksForSelectedDate = tasks.filter((task) =>
        new Date(task.dueDate).toDateString() === selectedDate.toDateString()
    );

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">📅 Calendar View</h2>
            <p>Here you can view and manage your scheduled tasks.</p>

            {/* Calendar Component */}
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
            />

            {/* Show tasks for the selected date */}
            <div className="mt-4">
                <h3 className="font-semibold">Tasks for {selectedDate.toDateString()}:</h3>
                {tasksForSelectedDate.length > 0 ? (
                    <ul>
                        {tasksForSelectedDate.map((task, index) => (
                            <li key={index} className="mt-2">
                                ✅ {task.title} (Priority: {task.priority})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tasks for this date.</p>
                )}
            </div>
        </div>
    );
};

export default CalendarView;
