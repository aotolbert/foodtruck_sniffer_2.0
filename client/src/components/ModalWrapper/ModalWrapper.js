import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalWrapper = props => (
  <div className="static-modal">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Sign In</Modal.Title>
        <Button onClick={props.handleClose}>X</Button>
      </Modal.Header>

      <Modal.Body>{props.children}</Modal.Body>
    </Modal.Dialog>
  </div>
);

export default ModalWrapper;