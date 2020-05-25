import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import BackGroundImage from "./../assets/login_background.jpeg";
import FormImage from "./../assets/login_form_studying.png";
import { Redirect } from "react-router-dom";

const LoginView = ({ setUser, user }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginUser = () => {
    if (email && password) {
      setUser({ email, password });
    }
  };
  // handle redirect
  if (user) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="login-view-container">
      <img id="login-view-image" src={BackGroundImage} />
      <div className="login-view-form">
        <div className="login-form-left">
          <h3>Ükool</h3>
          <img id="login-form-image" src={FormImage} />
        </div>
        <div className="login-form-right">
          <Form id="login-form">
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Sisesta email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Parool</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Sisesta parool"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button onClick={() => loginUser()}>Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
