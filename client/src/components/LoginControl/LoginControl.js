import React, { Component } from 'react';
import { SignButton } from '../Grid/SignButton';
import SignOutButton from '../SignOutButton';
import ModalWrapper from '../ModalWrapper';

class LoginControl extends Component {


  state = {
    loginState: 'new',
    show: false
  };

  handleToggle = () => {
    const currentValue = this.state.show;

    this.setState({ show: !currentValue });
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
    this.setState = { 
      loginState: 'loggedIn',
    };
  };

  componentDidMount() {
    if (this.state.loginState === 'loggedIn' && !this.props.authUser) {
      this.setState({ loginState: 'new' });
    } else if (this.props.authUser) {
      this.setState({ loginState: 'loggedIn' });
    }
  }

  render() {


    return (
      <div>
        {
          (this.state.loginState === 'loggedIn' && this.props.authUser)
            ? <SignOutButton handleLogoutCLick={this.handleLogoutClick} />
            : (this.state.loginState === 'loggedIn' && !this.props.authUser)
              ? <SignButton onClick={this.handleLoginClick} />
              : (this.props.authUser)
                ? <SignOutButton handleLogoutCLick={this.handleLogoutClick} />
                : <SignButton onClick={this.handleLoginClick} />
        }
        <ModalWrapper 
          show={this.state.show} 
          handleToggle={this.handleToggle}
          loginState={this.state.loginState}
          handleSignUpClick={this.handleSignUpClick}
          handleSignInClick={this.handleSignInClick}
        />
      </div>
    );
  }
}

export default LoginControl;
