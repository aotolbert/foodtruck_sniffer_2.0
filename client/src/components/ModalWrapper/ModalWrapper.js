import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ModalWrapper = props => (
  <Modal toggle={props.toggle} isOpen={props.show}>
    <ModalHeader toggle={props.toggle}>Sign-In</ModalHeader>
    <ModalBody>{props.children}</ModalBody>
  </Modal>
);

export default ModalWrapper;