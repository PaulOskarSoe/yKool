import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { ListGroup, ListGroupItem } from "reactstrap";
import CourseViewModal from "./CourseViewModal";

import CourseFormModal from "./CourseFormModal";

import { Button } from "reactstrap";
import { UserContext } from "./../store/UserContextProvider";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export const CourseView = () => {
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);

  const toggle = (item) => setOpenCourse(item.code);

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

  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/courses/${id}`);
      if (response && response.status === 200) {
        const newArray = courses.filter((course) => course._id !== id);
        setCourses(newArray);
      }
    } catch (error) {
      console.log("Error while removing a course", error.response);
    }
  };

  return (
    <div>
      <Button color="primary" onClick={() => {
        user.role === 1 ? setModalVisible(true) :
          console.log("Student cannot see this modal")}}>
        Lisa Kursus
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
              <ListGroup>
                <ListGroupItem>
                  <label onClick={() => toggle(item)} style={{ width: "100%" }}>
                    {item.name} {item.code} {item.description}
                  </label>

                  {user.role === 1 && (
                    <FaTrashAlt
                      style={{ float: "right" }}
                      onClick={() =>
                        Swal.fire({
                          title: "Oled kindel?",
                          text:
                            "Kas oled kindel, et soovid seda kursust eemaldada?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Jah, kustuta!",
                        }).then((result) => {
                          deleteCourse(item._id);
                          if (result.value) {
                            Swal.fire(
                              "Kustutatud!",
                              "Valitud kursus on kustutatud.",
                              "success"
                            );
                          }
                        })
                      }
                    />
                  )}
                </ListGroupItem>
              </ListGroup>
            </div>
          );
        })}
    </div>
  );
};
export default CourseView;
