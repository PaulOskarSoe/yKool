import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

const SignupModal = (props) => {
  const { visible, closeFn } = props;
  
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ name, setName ] = useState();
  const [ isPasswordValid, setPasswordValid ] = useState();
  const [ isEmailValid, setEmailValid ] = useState();
  const [ isNameValid, setNameValid ] = useState();
  
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email);
  }
  
  const handleSubmit = () => {
    if (password && password.length > 5) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
    if (email && validateEmail(email)) {
      setEmail(true);
    } else {
      setEmailValid(false);
    }
    if (name) {
      setName(true);
    } else {
      setNameValid(false);
    }
  }

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
            <Label for="name">Teie nimi</Label>
            <Input
              invalid={isNameValid === false ? true : undefined}
              type="text"
              name="name"
              placeholder="Nimi"
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => handleSubmit()}> Registreeri </Button>
        <Button onClick={() => closeFn(false)}> Loobu </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SignupModal;
