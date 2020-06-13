import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

const SignupModal = (props) => {
  const { visible, closeFn } = props;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [role, setRole] = useState(null);
  // error message handle
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isNameValid, setNameValid] = useState(true);
  const [isRoleValid, setRoleValid] = useState(true);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateUserInput = () => {
    if (!password || !password.length > 5) {
      setPasswordValid(false);
    }
    if (!email && !validateEmail(email)) {
      setEmailValid(false);
    }
    if (!name) {
      setNameValid(false);
    }
    if (!role) {
      setRoleValid(false);
    }
  };

  const handleSubmit = async () => {
    validateUserInput();
    const body = { email, password, fullName: name, role };
    try {
      const response = await axios.post("/api/v1/users/new_user", body);
      if (response && response.status === 200) {
        setNameValid(true);
        setEmailValid(true);
        setPasswordValid(true);
        setRoleValid(true);
        closeFn(false);
        Swal.fire("Kasutaja on tehtud!", "", "success");
      }
    } catch (error) {
      console.log("error while creating user: ", error.response);
      Swal.fire(error.response.data.message, "", "error");
    }
  };

  const handleRoleSelect = (role) => {
    if (!role) return setRole(null);
    role === "Õpetaja" ? setRole(1) : setRole(2);
  };

  return (
    <Modal isOpen={visible}>
      <ModalHeader>Loo uus kasutaja</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input
              invalid={isEmailValid === false ? true : undefined}
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Parool</Label>
            <Input
              invalid={isPasswordValid === false ? true : undefined}
              type="password"
              name="password"
              placeholder="Parool"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Täisnimi</Label>
            <Input
              invalid={isNameValid === false ? true : undefined}
              type="text"
              name="name"
              placeholder="Nimi"
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Vali roll</Label>
            <Input
              invalid={isRoleValid === false ? true : undefined}
              type="select"
              name="select-role"
              onChange={(e) => handleRoleSelect(e.target.value)}
            >
              <option>{null}</option>
              <option>Õpetaja</option>
              <option>Õpilane</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => handleSubmit()}>
          {" "}
          Registreeri{" "}
        </Button>
        <Button color="info" onClick={() => closeFn(false)}>
          {" "}
          Loobu{" "}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SignupModal;
