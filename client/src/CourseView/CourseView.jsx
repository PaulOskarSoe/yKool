import React, { useState, useEffect } from "react";
import axios from "axios";

import { ListGroup, ListGroupItem } from "reactstrap";
import CourseViewModal from "./CourseViewModal";

export const CourseView = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let response;
      try {
        // TODO: This need refacto because we will fetch all courses that user has in its object
        response = await axios("/api/v1/courses");
        response && setData(response.data);
      } catch (error) {
        console.log("Error while fetching courses: ", error);
      }
    }
    fetchData();
  }, []);
  const [openCourse, setOpenCourse] = useState(false);
  const toggle = (item) => setOpenCourse(item.code);
  return (
    <div>
      <h1>Course view</h1>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <CourseViewModal
              openKey={openCourse}
              toggleFn={toggle}
              data={item}
            />
            <ListGroup onClick={() => toggle(item)}>
              <ListGroupItem>
                {item.name} {item.code} {item.description}
              </ListGroupItem>
            </ListGroup>
          </div>
        );
      })}
    </div>
  );
};
export default CourseView;
