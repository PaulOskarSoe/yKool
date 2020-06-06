import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import BackGroundImage from "./../../assets/login_background.jpeg";
import CourseModal from "./CourseModal.jsx";

const CourseBox = ({ data, index }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="dashboard-course-box" key={index}>
      <CourseModal modal={modal} toggle={toggle} />
      <Card>
        <CardImg
          top
          id="course-box-img"
          src={BackGroundImage}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{data.name}</CardTitle>
          <CardSubtitle>{data.code}</CardSubtitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <Button onClick={() => setModal(true)}>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CourseBox;
