import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from "reactstrap";



const AssignmentModal = (props) => {
    const { visible, closeFn } = props;
    const [description, setDescription] = useState();
    const [dueDate, setDueDate] = useState();


    const submitAssignment = async () => {
        if (!description || !dueDate) {
            return Swal.fire({
                icon: "error",
                title: "Ülesande lisamine ebaõnnestus",
                text: "Sisesta kirjeldus ja kuupäev",
            });
        }

        //siia veel siis kui on olemas inff

    }

    return (
        <Modal isOpen={visible}>
            <ModalHeader>Loo uus ülesanne</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="description">Kirjeldus</Label>
                        <Input
                            type="text"
                            name="description"
                            placeholder="sisesta siia ülesande kirjeldus"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleDate">Kuupäev</Label>
                        <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button 
                    color="primary" 
                    onClick={() => {
                    submitAssignment()
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

export default AssignmentModal;