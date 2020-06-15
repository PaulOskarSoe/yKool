import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import { UserContext } from "./../../store/UserContextProvider";

export const CourseViewModal = (props) => {
  const { user } = useContext(UserContext);
  const { openKey, toggleFn, data } = props;
  const [pendingRequests, setPendingRequests] = useState([]);

  // poll course requests in every 3 seconds if user is a teacher
  useEffect(() => {
    const getAllPendingRequest = async () => {
      try {
        const response = await axios.get(
          `/api/v1/courses/request_access/access/${data._id}`
        );
        if (response && response.data && response.status === 200) {
          setPendingRequests(response.data.courseRequests.pendingStudendID);
        }
      } catch (error) {
        console.log(
          "error while getting pending requests by course id",
          error.response
        );
      }
    };
    user.role === 1 && getAllPendingRequest();
    let interval;
    // get all pending requests in every 3 seconds
    interval =
      user.role === 1 &&
      setInterval(() => {
        user.role === 1 && getAllPendingRequest();
      }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Modal isOpen={openKey === data.code} size="lg">
      <ModalHeader>{data.name}</ModalHeader>
      <ModalBody>
        <div stlye={{ float: "right" }}>
          {user.fullName} teil on {pendingRequests.length} uut soovijat
          kursusele
        </div>
        <label>{data.description}</label>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => toggleFn(false)}>
          Tagasi
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default CourseViewModal;
