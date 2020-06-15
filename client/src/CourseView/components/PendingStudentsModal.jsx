import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { MdDoNotDisturbOn } from "react-icons/md";

const PendingStudentsModal = ({ modal, toggle, pendingStudents, courseId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsersByUserId = async () => {
      const body = { pendingStudents: pendingStudents };
      try {
        const response = await axios.post("/api/v1/users/more_than_one", body);
        setUsers(response.data.user);
      } catch (error) {
        console.log(
          "error while getting users by array of user ids",
          error.response
        );
      }
    };
    getUsersByUserId();
    return () => {
      setUsers([]);
    };
  }, []);

  const handleUserAccpet = async (isAccepted, studendId) => {
    const body = { courseId, didAccept: isAccepted, userId: studendId };
    try {
      const response = await axios.post(
        "/api/v1/courses/accept/request_access",
        body
      );
      if (response && response.status === 200) {
        const newArray = users.filter((user) => user._id !== studendId);
        setUsers(newArray);
      }
    } catch (error) {
      console.log("error while accepting or declining user");
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Tudengid, kes soovivad liituda kursusega
        </ModalHeader>
        <ModalBody>
          {users &&
            users.map((student, index) => (
              <div key={index}>
                Nimi: {student.fullName} email: {student.email}
                <div style={{ float: "right" }}>
                  <MdDoNotDisturbOn
                    onClick={() => handleUserAccpet(false, student._id)}
                    style={{ color: "red", width: "30px", height: "30px" }}
                  />
                </div>
                <div style={{ float: "right" }}>
                  <TiTick
                    onClick={() => handleUserAccpet(true, student._id)}
                    style={{ color: "green", width: "30px", height: "30px" }}
                  />
                </div>
              </div>
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
