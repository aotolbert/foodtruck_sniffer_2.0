import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalWrapper = props => (
  <div className="static-modal">
    <Modal show={props.show} onHide={}>
      <Modal.Header>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>One fine body...</Modal.Body>

    </Modal>
  </div>
);

export default ModalWrapper;