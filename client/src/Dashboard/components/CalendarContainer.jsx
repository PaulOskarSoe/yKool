import React, { useState, useEffect } from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import "moment/locale/et"
import axios from "axios";

const CalendarContainer = ({ courses }) => {
  const [assignments, setAssignments] = useState([]);
  const courseId =
    courses && courses.length && courses.map((course) => course._id);
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `/api/v1/assignments/courses/array_courseID/`,
          { params: { courseId } }
        );
        if (response && response.status === 200) {
          setAssignments(response.data.data);
        }
      } catch (error) {
        console.log("error: ", error.response);
      }
    };

    if (courses.length) {
      fetchAssignments();
    }
  }, [courses]);

  const groupCourses = courses.map((course) => {
    return {
      id: course._id,
      title: course.name,
    };
  });

  const groupAssignments =
    assignments &&
    assignments.map((assignment) => {
      return {
        id: assignment._id,
        group: assignment.courseID,
        title: assignment.description,
        start_time: moment(assignment.endDate).subtract(1, "day"),
        end_time: moment(assignment.endDate).add(1, "day"),
        itemProps: {
          "aria-hidden": true,
          className: "weekend",
          style: {
            background: "orange",
          },
        },
      };
    });

  return (
    <div className="calendar-container">
      <Timeline
        groups={groupCourses}
        items={groupAssignments}
        defaultTimeStart={moment().add(-4, "day")}
        defaultTimeEnd={moment().add(3, "day")}
        lineHeight={100}
      />
    </div>
  );
};

export default CalendarContainer;
