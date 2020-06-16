import React, {useContext, useState} from "react";
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import AssignmentModal from "../AssignmentModal/AssignmentModal";
import {UserContext} from "../store/UserContextProvider";

export const CourseViewModal = (props) => {
  
  const { openKey, toggleFn, data } = props;
  const [ modalVisible, setModalVisible] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <div>
      <Modal isOpen={openKey === data.code}>
        <ModalHeader>{data.name}</ModalHeader>
        <ModalBody>{data.description}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => toggleFn(false)}>
            Tagasi
          </Button>{" "}
          <div>
          {(user.role === 1) && (
          <Button color="primary" onClick={() => setModalVisible(true)}>
            Lisa ülesanne
          </Button>)
          }
          </div>
        </ModalFooter>
      </Modal>
      <AssignmentModal visible={modalVisible} closeFn={setModalVisible} />
    </div>
  );
};

export default CourseViewModal;
