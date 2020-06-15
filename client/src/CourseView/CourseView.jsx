import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./../store/UserContextProvider";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";

// SUBCOMPONENTS
import CourseViewModal from "./components/CourseViewModal";
import CourseFormModal from "./components/CourseFormModal";
import FindCourseModal from "./components/FindCourseModal";

export const CourseView = () => {
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [searchCourseModal, setSeachCourseModal] = useState(false);
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
      {user.role === 1 && (
        <div>
          <Button color="primary" onClick={() => setCourseModalVisible(true)}>
            Lisa kursus
          </Button>
          <CourseFormModal
            visible={courseModalVisible}
            closeFn={setCourseModalVisible}
            setCourses={setCourses}
          />
        </div>
      )}
      <div id="find-course-container" title="Otsi kursust">
        <IoIosAddCircle
          id="find-course-icon"
          onClick={() => setSeachCourseModal(true)}
        />
        <FindCourseModal
          showModal={searchCourseModal}
          toggle={() => setSeachCourseModal(false)}
        />
      </div>
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
                    {item && item.name && item.code && item.description && (
                      <label>
                        {item.name} {item.code} {item.description}
                      </label>
                    )}
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
