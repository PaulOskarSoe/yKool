import React from "react";
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

const CourseBox = ({ data }) => {
  return (
    <div className="dashboard-course-box">
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
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CourseBox;
