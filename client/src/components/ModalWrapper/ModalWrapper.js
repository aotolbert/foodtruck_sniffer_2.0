import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';

const ModalWrapper = props => {

  return <Modal toggle={props.handleToggle} isOpen={props.show}>
      <ModalHeader toggle={props.handleToggle}>
        {props.loginState === 'clickedSignUp'
          ? 'Create an Account'
          : 'Sign In'}
      </ModalHeader>
      <ModalBody>
        {props.loginState === 'clickedSignUp' ? (
          <SignUpPage handleToggle={props.handleToggle} />
        ) : props.loginState === 'clickedLogin' ? (
          <SignInPage
            handleSignInClick={props.handleSignInClick}
            handleSignUpClick={props.handleSignUpClick}
            handleToggle={props.handleToggle}
          />
        ) : (
          undefined
        )}
      </ModalBody>
    </Modal>;
};

export default ModalWrapper;