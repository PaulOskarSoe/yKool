import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

const PendingStudentsModal = ({ modal, toggle, pendingStudents }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsersByUserId = async () => {
      const body = { pendingStudents };
      try {
        const response = await axios.get("/api/v1/users/more_than_one", body);
        console.log("response: ", response);
      } catch (error) {
        console.log(
          "error while getting users by array of user ids",
          error.response
        );
      }
    };
    getUsersByUserId();
  }, [pendingStudents]);

  console.log("pendgin students: ", pendingStudents);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Tudengid, kes soovivad liituda kursusega
        </ModalHeader>
        <ModalBody>
          {pendingStudents &&
            pendingStudents.map((student, index) => (
              <div key={index}>{student.name}</div>
            ))}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Tagasi
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PendingStudentsModal;
