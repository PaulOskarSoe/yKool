import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import CourseViewModal from "./CourseViewModal";
import axios from "axios";

export const CourseView = () => {
  const [data, setData] = useState([]);
    useEffect( () => {
      async function fetchData() {
        const response = await axios("http://localhost:8080/api/v1/courses");
        setData(response.data);
      }
      fetchData();
    }, []);

  const [openCourse, setOpenCourse] = useState(false);
  const toggle = (item) => setOpenCourse(item.code);
  return (
    <div>
      <h1>Course view</h1>
      {
          data.map((item, index) => {
            return (
                <div key={index}>
                    <CourseViewModal
                      openKey={openCourse}
                      toggleFn={toggle}
                      data={item}
                    />
                    <ListGroup onClick={() => toggle(item)} >
                        <ListGroupItem>
                          {item.name} {item.code} {item.description}
                        </ListGroupItem>
                    </ListGroup>
                </div>
            )
        })
      }
    </div>
  );
};
export default CourseView;
