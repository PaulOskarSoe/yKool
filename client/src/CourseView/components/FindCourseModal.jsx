import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  InputGroupText,
  Input,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

export const FindCourseModal = ({ showModal, toggle }) => {
  const [searchText, setSearchText] = useState();
  const [courses, setCourses] = useState([]);

  // if we update search text then we request for all the courses by search query which is search text
  useEffect(() => {
    const getCoursesByCourseName = async () => {
      try {
        const response = await axios.get(`/api/v1/courses/name/${searchText}`);
        console.log(response);
        response &&
          response.data &&
          response.status === 200 &&
          setCourses(response.data);
      } catch (error) {
        console.log("error while getting courses by name: ", error);
      }
    };
    searchText && searchText.length && getCoursesByCourseName();
  }, [searchText]);

  const requestForCoursePermission = async (courseId) => {
    const body = { courseId };
    try {
      const response = await axios.post("/api/v1/courses/request_access", body);
      if (response && response.status === 200) {
        Swal.fire(
          "Kutse saadetud",
          "Kutse saadeti kursuse õppejõule",
          "success"
        );
        toggle();
      }
    } catch (error) {
      console.log("error while requesting permission: ", error);
      Swal.fire(
        "Midagi läks valesti",
        "Kutse saadeti kursuse õppejõule",
        "error"
      );
    }
  };

  return (
    <Modal isOpen={showModal} size="large">
      <ModalHeader>Otsi kursust nime järgi</ModalHeader>
      <ModalBody>
        <InputGroup>
          <Input
            placeholder="Sisesta kursuse nimi"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </InputGroup>
        {courses &&
          courses.map((course, index) => {
            return (
              <div key={index}>
                <ListGroup>
                  <ListGroupItem>
                    <label style={{ width: "100%" }}>
                      {course && course.name && course.code && (
                        <div>
                          <label>
                            <h3>
                              {course.name}, {course.code}
                            </h3>
                          </label>
                          <Button
                            style={{ float: "right" }}
                            color="success"
                            onClick={() =>
                              requestForCoursePermission(course._id)
                            }
                          >
                            Lisa kursus
                          </Button>
                        </div>
                      )}
                    </label>
                  </ListGroupItem>
                </ListGroup>
              </div>
            );
          })}
      </ModalBody>
      <ModalFooter>
        <Button color="info" onClick={() => toggle()}>
          Tagasi
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default FindCourseModal;
