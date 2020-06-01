import React from "react";
import {Modal, Button, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export const CourseViewModal = (props) => {
    const { openKey, toggleFn, data } = props;

    return (
        <Modal isOpen={openKey === data.code}>
            <ModalHeader >{data.name}</ModalHeader>
            <ModalBody>
                {data.description}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => toggleFn(false)} >Close modal</Button>{' '}
            </ModalFooter>
        </Modal>
    )

}

export default CourseViewModal;
