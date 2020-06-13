import React, { useState } from "react";

import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

const CourseFormModal = (props) => {
  const { visible, closeFn, setCourses } = props;

  const [courseName, setCourseName] = useState();
  const [courseCode, setCourseCode] = useState();
  const [courseDescription, setCourseDescription] = useState();

  const addCourse = async () => {
    const body = {
      name: courseName,
      code: courseCode,
      description: courseDescription,
    };
    try {
      const response = await axios.post("/api/v1/courses/new_course", body);
      if (response && response.status === 200) {
        Swal.fire(
          "Kursuse lisamine õnnestus",
          `${courseName} on lisatud!`,
          "success"
        );
      }
      setCourses((courses) => [...courses, response.data.data]);
      closeFn(false);
    } catch (error) {
      console.log("error while adding course: ", error);
      Swal.fire("Midagi läks valesti", "", "danger");
    }
  };

  return (
    <Modal isOpen={visible}>
      <ModalHeader>Lisa kursus</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="courseName">Kursuse nimi</Label>
            <Input
              type="name"
              name="name"
              id="courseName"
              placeholder="sisesta kursuse nimi"
              onChange={(e) => setCourseName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="courseCode">Kursuse kood</Label>
            <Input
              type="code"
              name="code"
              id="courseCode"
              placeholder="sisesta kursuse kood"
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="courseDescription">Kursuse kirjeldus</Label>
            <Input
              type="description"
              name="description"
              id="courseDescription"
              placeholder="sisesta kursuse kirjeldus"
              onChange={(e) => setCourseDescription(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => addCourse()}>
          Lisa
        </Button>
        <Button
          color="danger"
          onClick={() => {
            closeFn(false);
          }}
        >
          {" "}
          Loobu{" "}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CourseFormModal;
