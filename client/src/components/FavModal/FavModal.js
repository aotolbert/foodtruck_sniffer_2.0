import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoginControl from '../LoginControl';

const FavModal = props => (
  <Modal toggle={props.handleToggle} isOpen={props.show}>
    <ModalHeader toggle={props.handleToggle}>Favorite Trucks</ModalHeader>
    <ModalBody>
      You must sign in to be able to add trucks to your favorites!
    </ModalBody>
    <ModalFooter>
      <LoginControl authUser={props.authUser} />
    </ModalFooter>
  </Modal>
);

export default FavModal;