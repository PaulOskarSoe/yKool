import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Badge,
} from "reactstrap";
import axios from "axios";
import { UserContext } from "./../../store/UserContextProvider";

import PendingStudentsModal from "./PendingStudentsModal";

export const CourseViewModal = (props) => {
  const { user } = useContext(UserContext);
  const { openKey, toggleFn, data } = props;
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pengingRequestsModal, setPendingRequestsModal] = useState(false);

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

  // handle grammar
  const handleSinglar = pendingRequests.length > 1 && "t";

  return (
    <Modal isOpen={openKey === data.code} size="lg">
      <ModalHeader>{data.name}</ModalHeader>
      <ModalBody>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setPendingRequestsModal(true)}
        >
          <h5>
            {user.fullName}, teil on
            <Badge color="info">{pendingRequests.length}</Badge> soovija
            {handleSinglar} kursusele {data.name}
          </h5>
          kursusele
        </div>
        <label>{data.description}</label>
        <PendingStudentsModal
          toggle={() => setPendingRequestsModal(false)}
          modal={pengingRequestsModal}
          pendingStudents={pendingRequests}
        />
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
