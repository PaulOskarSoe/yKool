import React, { useState, useEffect } from "react";
import axios from "axios";

import { ListGroup, ListGroupItem } from "reactstrap";
import CourseViewModal from "./CourseViewModal";

import CourseFormModal from "./CourseFormModal";

import { Button } from "reactstrap";

export const CourseView = () => {
  const [courses, setCourses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    async function fetchData() {
      let response;
      try {
        // TODO: This need refacto because we will fetch all courses that user has in its object
        response = await axios("/api/v1/courses");
        response && setCourses(response.data);
      } catch (error) {
        console.log("Error while fetching courses: ", error);
      }
    }
    fetchData();
    return () => {
      setCourses([]);
    };
  }, []);
  const [openCourse, setOpenCourse] = useState(false);
  const toggle = (item) => setOpenCourse(item.code);
  return (
    <div>
      <h1>Course view</h1>
      <Button color="primary" onClick={() => setModalVisible(true)}>
        Lisa kursus
      </Button>
      <CourseFormModal
        visible={modalVisible}
        closeFn={setModalVisible}
        setCourses={setCourses}
      />
      {courses.map((item, index) => {
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
