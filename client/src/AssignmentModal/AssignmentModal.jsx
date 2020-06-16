import React, { useState } from "react";
import axios from "axios";
import {Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Swal from "sweetalert2";

const AssignmentModal = (props) => {
  const { visible, closeFn } = props;
  const [courseId, setCourseId] = useState();
  const [description, setDescription] = useState();
  const [endDate, setEndDate] = useState();
  
  const [isCourseIdValid, setCourseIdValid] = useState(true);
  const [isDescriptionValid, setDescriptionValid] = useState(true);
  const [isEndDateValid, setEndDateValid] = useState(true);
  
  
  const validateUserInput = () => {
    if (!description || !description.length > 5) {
      setDescriptionValid(false);
    }
    if (!courseId) {
      setCourseIdValid(false);
    }
    if (!endDate) {
      setEndDateValid(false);
    }
  }
  
  const handleSubmit = async () => {
    validateUserInput();
    const body = { courseId, description, endDate };
    try {
      const response = await axios.post("/api/v1/assignments/new_assignment", body);
      if (response && response.status === 200) {
        removeErrors();
        closeFn(false);
        Swal.fire("Ülesanne on lisatud!", "", "success");
      }
    } catch (error) {
      console.log("error while creating assignment: ", error.response);
      Swal.fire(error.response.data.message, "", "error");
    }
  }
  
  const removeErrors = () => {
    setCourseIdValid(true);
    setDescriptionValid(true);
    setEndDateValid(true);
  };
    
  return (
      <Modal isOpen={visible} aria-labelledby="contained-modal-title-vcenter">
        <ModalHeader>Lisa uus ülesanne</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="password">Kursuse ID</Label>
              <Input
                invalid={isCourseIdValid === false ? true : undefined}
                type="text"
                name="courseId"
                placeholder="Kursuse ID"
                onChange={(e) => setCourseId(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Ülesande Kirjeldus</Label>
              <Input
                invalid={isDescriptionValid === false ? true : undefined}
                type="text"
                name="description"
                placeholder="Ülesande kirjeldus"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Esitamise kuupäev</Label>
              <Input
                invalid={isEndDateValid === false ? true : undefined}
                type="date"
                name="datetime"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => handleSubmit()}>
            {" "}
            Lisa ülesanne{" "}
          </Button>
          <Button
            color="info"
            onClick={() => {
              removeErrors();
              closeFn(false);
            }}
          >
            Loobu{" "}
          </Button>
        </ModalFooter>
      </Modal>
  );
};

export default AssignmentModal;

