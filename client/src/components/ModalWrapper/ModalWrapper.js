import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';

const ModalWrapper = props => {

  return(
    <Modal toggle={props.toggle} isOpen={props.show}>
      <ModalHeader toggle={props.toggle}>
        {(props.loginState === 'clickedSignUp') ? 'Create an Account' : 'Sign In'}
      </ModalHeader>
      <ModalBody>
        {
          (props.loginState === 'clickedSignUp')
            ? <SignUpPage />
            : (props.loginState === 'clickedLogin')
              ? <SignInPage 
                  handleSignInClick={props.handleSignInClick} 
                  handleSignUpClick={props.handleSignUpClick}
                  toggle={props.toggle}
                />
              : undefined
        }
      </ModalBody>
    </Modal>
  );
};

export default ModalWrapper;