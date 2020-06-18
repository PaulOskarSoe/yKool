import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Badge,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import axios from "axios";
import { UserContext } from "../../store/UserContextProvider";

import PendingStudentsModal from "./PendingStudentsModal";
import AssignmentModal from "./AssignmentModal";

export const CourseViewModal = (props) => {
  const { user } = useContext(UserContext);
  const { openKey, toggleFn, course } = props;
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pengingRequestsModal, setPendingRequestsModal] = useState(false);
  const [assignmentVisibilityModal, setAssignmentvisibilty] = useState(false);
  const [assignments, setAssignments] = useState([]);

  // poll course requests in every 3 seconds if user is a teacher
  useEffect(() => {
    const fetchCourseAssignments = async () => {
      try {
        const response = await axios.get(
          "/api/v1/assignments/" + course._id
        );
        if(response && response.status ===200)
          setAssignments(response.data.data);
          console.log("fetching assignments: OK", response)
      } catch (error) {
        console.log(
          "error while fetching assignments",
          error.response)
      }
    }

//pean selle data nyyd alla lahtima mapima, paulil endal ka palju näiteid, vaata seda pending requesti vb idk. 
//pending studentsmodalis ka vb veidi ilusam map olemas, vaata seda ka

    const getAllPendingRequest = async () => {
      try {
        const response = await axios.get(
          `/api/v1/courses/request_access/access/${course._id}`
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
    fetchCourseAssignments();
    
    user.role === 1 && getAllPendingRequest();
    let interval;
    // get all pending requests in every 3 seconds
    interval =
      user.role === 1 &&
      setInterval(() => {
        user.role === 1 && getAllPendingRequest();
      }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // handle grammar
  const handleSinglar =
    pendingRequests.length > 1 || (pendingRequests.length === 0 && "t");

  return (
    <Modal isOpen={openKey} size="lg">
      <ModalHeader>{course.name}</ModalHeader>
      <ModalBody>
        {user.role === 1 && (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setPendingRequestsModal(true)}
          >
            <h5>
              {user.fullName}, teil on{" "}
              <Badge color="info">{pendingRequests.length}</Badge> soovija
              {handleSinglar} kursusele{" "}
              <Badge color="info">{course.name}</Badge>
            </h5>
            kursusele
          </div>
        )}
        <label>{course.description}</label>
        <PendingStudentsModal
          toggle={() => setPendingRequestsModal(false)}
          modal={pengingRequestsModal}
          pendingStudents={pendingRequests}
          courseId={course._id}
        />
        <h4>Kodutööd:</h4>
        {assignments &&
          assignments.map((assignment, index) => {
            return (
              <div key={index}>
                <ListGroup>
                  <ListGroupItem>
                    <label style={{ width: "100%" }}>
                      {assignment && assignment.description && assignment.endDate && (
                        <div>
                          <label>
                            <h5>
                              {assignment.description} - {assignment.endDate}
                            </h5>
                          </label>
                        </div>
                      )}
                    </label>
                  </ListGroupItem>
                </ListGroup>
              </div>
            )
          })}
      </ModalBody>
      <ModalFooter>
        <div>
          {user.role === 1 && (
            <Button
              color="primary"
              onClick={() => setAssignmentvisibilty(true)}
            >
              Lisa uus ülesanne
            </Button>
          )}
          <AssignmentModal
            visible={assignmentVisibilityModal}
            closeFn={setAssignmentvisibilty}
            courseId={course._id}
          />
        </div>
        <Button color="primary" onClick={() => toggleFn(false)}>
          Tagasi
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default CourseViewModal;
