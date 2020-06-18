import React, { useState, useContext } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardFooter,
} from "reactstrap";
import BackGroundImage from "../../assets/login_background.jpeg";
import { UserContext } from "./../../store/UserContextProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
// SUBCOMPONENTS
import CourseViewModal from "./CourseViewModal";

const CourseBox = ({ course, index, courses, setCourses }) => {
  const { user } = useContext(UserContext);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  // delete course by id
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

  console.log("modal: ", modal);
  return (
    <div className="dashboard-course-box" key={index}>
      <CourseViewModal course={course} openKey={modal} toggleFn={toggle} />
      <Card>
        <CardImg
          top
          id="course-box-img"
          src={BackGroundImage}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{course.name}</CardTitle>
          <CardSubtitle>{course.code}</CardSubtitle>
          <CardText>{course.description}</CardText>
          <Button className="course-box" onClick={() => setModal(true)}>Vaata</Button>
        </CardBody>
        <CardFooter>
          {user.role === 1 && (
            <FaTrashAlt
              style={{ float: "right" }}
              onClick={() =>
                Swal.fire({
                  title: "Oled kindel?",
                  text: "Kas oled kindel, et soovid seda kursust eemaldada?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Jah, kustuta!",
                }).then((result) => {
                  deleteCourse(course._id);
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseBox;
