import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarContainer = () => {
  const [date, updateDate] = useState(new Date());

  const onChange = (newDate) => updateDate(newDate);

  return (
    <div className="calendar-container">
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default CalendarContainer;
