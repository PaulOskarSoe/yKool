import React, { useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import CourseViewModal from "./CourseViewModal";

const data = [
  {
    name: "Hulgateooria",
    code: "IF9120",
    description: "hulgateooria sissejuhatus",
  },
  {
    name: "Interaktsioonidisain",
    code: "IF1230",
    description: "interaktsioonidisaini sissejuhatus",
  },
  {
    name: "Infosüsteemid",
    code: "IFI9535",
    description: "infosüsteemide sissejuhatus",
  },
];

export const CourseView = () => {
  const [openCourse, setOpenCourse] = useState(false);
  const toggle = (item) => setOpenCourse(item.code);
  return (
    <div>
      <h1>Course view</h1>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <CourseViewModal
              openKey={openCourse}
              toggleFn={toggle}
              data={item}
            />
            <ListGroup onClick={() => toggle(item)}>
              <ListGroupItem>
                {item.name} {item.code} {item.description}
              </ListGroupItem>
            </ListGroup>
          </div>
        );
      })}
    </div>
  );
};
export default CourseView;
