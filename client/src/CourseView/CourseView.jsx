import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { ListGroup, ListGroupItem } from "reactstrap";
import CourseViewModal from "./CourseViewModal";

import CourseFormModal from "./CourseFormModal";

import { Button } from "reactstrap";
import { UserContext } from "./../store/UserContextProvider";

export const CourseView = () => {
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let response;
      try {
        response = await axios(`/api/v1/courses/${user._id}`);
        response && setCourses(response.data.data);
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
  console.log("courses:", courses);
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
      {courses &&
        courses.map((item, index) => {
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
