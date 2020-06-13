import React, { useState } from "react";

import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

const CourseFormModal = (props) => {
  const { visible, closeFn } = props;

  const [courseName, setCourse] = useState();
  const [courseCode, setCourseCode] = useState();
  const [courseDescription, setCourseDescription] = useState();

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
              onChange={(e) => setCourse(e.target.value)}
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
        <Button color="primary">Lisa</Button>
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
