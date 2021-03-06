import React, { Component } from 'react';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';

const SignInPage = props => (
  <div>
    <SignInForm
      handleToggle={props.handleToggle}
      handleSignInClick={props.handleSignInClick}
    />
    <SignUpLink
      handleSignUpClick={props.handleSignUpClick}
      handleToggle={props.handleToggle}
    />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        // this.props.history.push(ROUTES.HOME);
        this.props.handleToggle().bind(this);
        this.props.handleSignInClick().bind(this);

      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            className="form-control"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <button 
          disabled={isInvalid} 
          type="submit"
          className="btn btn-success"
        >
          Sign In
        </button>

        {error && <div className="alert alert-danger mt-3" role="alert">
                    {error.message}
                  </div>}
      </form>
    );
  }
}


const SignInForm = withFirebase(SignInFormBase);

export default SignInPage;

export { SignInForm };