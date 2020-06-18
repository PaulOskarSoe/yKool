import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

/**
vaja lisada assignmenti salvestus
yhendada apiga
 */

const AssignmentModal = (props) => {
  const { visible, closeFn, courseId, setAssignments } = props;
  const [description, setDescription] = useState();
  const [dueDate, setDueDate] = useState();

  const submitAssignment = async () => {
    const body = {
      courseId: courseId,
      description: description,
      endDate: dueDate,
    };
    if (!description || !dueDate) {
      return Swal.fire(
        "Ülesande lisamine ebaõnnestus",
        "Sisesta kirjeldus ja kuupäev",
        "error"
      );
    }
    try {
      const response = await axios.post(
        "/api/v1/assignments/new_assignment",
        body
      );
      if (response && response.status === 200) {
        setAssignments((assignments) => [...assignments, response.data.data]);
        closeFn(false);
        console.log("response: ", response);
        Swal.fire("Uus ülesanne on lisatud!", "", "success");
      }
    } catch (error) {
      console.log("error while submiting assignment", error);
    }
  };

  return (
    <Modal isOpen={visible}>
      <ModalHeader>Loo uus ülesanne</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="assignmentDescription">Kirjeldus</Label>
            <Input
              type="description"
              name="description"
              id="assignmentDescription"
              placeholder="sisesta siia ülesande kirjeldus"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="dueDate">Kuupäev</Label>
            <Input
              type="date"
              name="date"
              id="dueDate"
              onChange={(e) => setDueDate(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            submitAssignment();
          }}
        >
          {" "}
          Lisa{" "}
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

export default AssignmentModal;
