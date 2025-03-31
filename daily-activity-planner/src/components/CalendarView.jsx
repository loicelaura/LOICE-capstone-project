import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
    const [events, setEvents] = useState([
        {
            title: "Task 1",
            start: new Date(),
            end: new Date(),
        },
    ]);

    return (
        <div className="p-4">
            <h2 className="p-2 rounded-md hover:bg-blue-100 transition-colors">Calendar View</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
};

export default CalendarView;
