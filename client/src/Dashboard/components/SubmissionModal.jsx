import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const SubmissionModal = (props) => {
  const { visible, closeFn, assignmentId } = props;
  const [submissionContent, setSubmissionContent] = useState();
  const [submissionTitle, setSubmissionTitle] = useState();
  
  
  const submitSubmission = async () => {
    const body = {assignmentId: assignmentId, submissionTitle: submissionTitle, submissionContent: submissionContent}
    if (!submissionTitle || !submissionContent) {
      return Swal.fire("Ülesande lisamine ebaõnnestus", "Sisesta pealkiri ja sisu", "error");
    }
    try {
      const response = await axios.post(
        "/api/v1/submissions/new_submission",
        body
      );
      if (response && response.status === 200) {
        closeFn(false);
        Swal.fire("Ülesanne on esitatud!", "", "success");
      }
    } catch (error) {
      console.log(
        "error while submiting submission",
        error)
    }
  }
    return (
      <Modal size="large" isOpen={visible}>
        <ModalHeader>Lisa esitatav ülesanne</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
            
            </FormGroup>
            <FormGroup>
              <Label for="submissionTitle">Esitatava ülesande pealkiri</Label>
              <Input
                type="text"
                name="submissionTitle"
                id="submissionTitle"
                onChange={(e) => setSubmissionTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="submissionContent">Esitatava ülesande sisu</Label>
              <Input
                type="description"
                name="submissionContent"
                id="submissionContent"
                placeholder="sisesta siia esitatava ülesande sisu"
                onChange={(e) => setSubmissionContent(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              submitSubmission()
            }}
          >
            {" "}
            Lisa{" "}
          </Button>
          <Button
            color="danger"
            onClick={() => {
              closeFn(false)
            }}
          >
            {" "}
            Loobu{" "}
          </Button>
        </ModalFooter>
      </Modal>
    );
  };


export default SubmissionModal;
