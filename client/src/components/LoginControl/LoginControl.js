import React, { Component } from 'react';
import { SignButton } from '../Grid/SignButton';
import SignOutButton from '../SignOutButton';
import { SignUpForm } from '../SignUp';
import SignInPage from '../SignIn';
import ModalWrapper from '../ModalWrapper';

class LoginControl extends Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);

    this.state = {
      loginState: 'new',
      show: true
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleLoginClick = () => {
    this.setState({
      loginState: 'clickedLogin',
      show: true
    });
  };

  handleLogoutClick = () => {
    this.setState({ loginState: 'new' });
  };

  handleSignUpClick = () => {
    this.setState({ loginState: 'clickedSignUp' });
  };

  handleSignInClick = () => {
    this.setState = { loginState: 'loggedIn' };
  };

  componentDidMount() {
    if (this.state.loginState === 'loggedIn' && !this.props.authUser) {
      this.setState({ loginState: 'new' });
    } else if (this.props.authUser) {
      this.setState({ loginState: 'loggedIn' });
    }
  }

  render() {
    if (this.state.loginState === 'loggedIn' && this.props.authUser) {
      return <SignOutButton handleLogoutCLick={this.handleLogoutClick} />;
    } else if (this.state.loginState === 'loggedIn' && !this.props.authUser) {
      return <SignButton onClick={this.handleLoginClick} />;
    } else if (this.props.authUser) {
      return <SignOutButton handleLogoutClick={this.handleLogoutClick} />;
    } else if (this.state.loginState === 'clickedLogin') {
      return (
        <ModalWrapper handleClose={this.handleClose}>
          <SignInPage handleSignInClick={this.handleSignInClick} />
        </ModalWrapper>
      );
    } else if (this.state.loginState === 'clickedSignUp') {
      return (
        <ModalWrapper>
          <SignUpForm handleSignUpClick={this.handleSignUpClick} />
        </ModalWrapper>
      );
    } else {
      return <SignButton onClick={this.handleLoginClick} />;
    }
  }
}

export default LoginControl;
