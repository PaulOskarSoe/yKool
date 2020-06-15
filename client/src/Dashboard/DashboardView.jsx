import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../store/UserContextProvider";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Button } from "reactstrap";
import axios from "axios";

// SUBCOMPONENTS
import CourseViewModal from "./components/CourseViewModal";
import CourseFormModal from "./components/CourseFormModal";
import FindCourseModal from "./components/FindCourseModal";
import CourseBox from "./components/CourseBox";
import CalendarContainer from "./components/CalendarContainer";

export const DashboardView = () => {
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [searchCourseModal, setSeachCourseModal] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);

  const toggle = (item) => setOpenCourse(item.code);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios(`/api/v1/courses/${user._id}`);
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

  return (
    <div className="dashboard-content">
      <div className="dashboard-course-container">
        <div id="dashboard-icons">
          {user.role === 1 && (
            <div id="add-course-container">
              <Button
                icon="warning"
                color="course"
                onClick={() => setCourseModalVisible(true)}
              >
                <FaPlus
                  className="plus-icon"
                  style={{ color: "white", margin: "0px 10px 0px 0px" }}
                />
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
            <Button
              icon="warning"
              color="course"
              onClick={() => setSeachCourseModal(true)}
            >
              <FaSearch
                className="plus-icon"
                style={{ color: "white", margin: "0px 10px 0px 0px" }}
              />
              Otsi kursusi
            </Button>
            <FindCourseModal
              showModal={searchCourseModal}
              toggle={() => setSeachCourseModal(false)}
            />
          </div>
        </div>
        {courses &&
          courses.map((item, index) => {
            return (
              <div key={index}>
                <CourseViewModal
                  openKey={openCourse}
                  toggleFn={toggle}
                  course={item}
                />
                <CourseBox
                  course={item}
                  index={index}
                  courses={courses}
                  setCourses={setCourses}
                />
              </div>
            );
          })}
      </div>
      <CalendarContainer />
    </div>
  );
};
export default DashboardView;
