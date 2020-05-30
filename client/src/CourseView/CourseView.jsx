import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const test = [
    {name: 'Hulgateooria', code: 'IF9120',  description: "hulgateooria sissejuhatus"},
    {name: 'Interaktsioonidisain', code: 'IF1230',  description: "interaktsioonidisaini sissejuhatus"},
    {name: 'Infosüsteemid', code: 'IFI9535', description: "infosüsteemide sissejuhatus"}
];

export const CourseView = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggle = () => setModalVisible(!isModalVisible);
  const renderModal= () => {
      return (
          <Modal isOpen={isModalVisible}>
          <ModalHeader >Modal title</ModalHeader>
          <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={toggle} >Close modal</Button>{' '}
          </ModalFooter>
      </Modal>
      )
  };

  return (
    <div>
      <h1>Course view</h1>
      {
        test.map(item => {
            return (
                <div onClick={toggle} >
                {item.name} {item.code} {item.description}
                </div>
            )
        })
      }
        <Button color="danger" onClick={toggle} >Show Modal</Button>
    </div>
  );
};
export default CourseView;
