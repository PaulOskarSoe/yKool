import React from "react";

import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Form, FormGroup, Label, Input } from 'reactstrap';

const CourseFormModal = (props) => {
    const { visible, closeFn } = props;
    return (
    <Modal isOpen={visible}>
        <ModalHeader>Lisa kursus</ModalHeader>
        <ModalBody>
        <Form>
        <FormGroup>
            <Label for="courseName">Kursuse nimi</Label>
            <Input type="name" name="name" id="courseName" placeholder="sisesta kursuse nimi" />
        </FormGroup>
        <FormGroup>
            <Label for="courseCode">Kursuse kood</Label>
            <Input type="code" name="code" id="courseCode" placeholder="sisesta kursuse kood" />
        </FormGroup>
        <FormGroup>
            <Label for="courseDescription">Kursuse kirjeldus</Label>
            <Input type="description" name="description" id="courseDescription" placeholder="sisesta kursuse kirjeldus" />
        </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
            <Button 
            color="primary">
            Lisa
            </Button>
            <Button
                color="danger"
                onClick={() => {
                closeFn(false);
                }}>
            {" "}
            Loobu{" "}
        </Button>
        </ModalFooter>
    </Modal>
    );
};

export default CourseFormModal;