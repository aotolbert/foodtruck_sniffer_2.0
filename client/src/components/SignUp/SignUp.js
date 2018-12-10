import React, { Component } from 'react';

import { withFirebase, FirebaseContext } from '../Firebase';
// import * as ROUTES from '../../../../routes';

const SignUpPage = () => (
    <div>
        <FirebaseContext.Consumer>
            {firebase => <SignUpForm firebase={firebase} />}
        </FirebaseContext.Consumer>
    </div>
);

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};


class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        event.preventDefault();

        const { email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });


    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            firstName,
            lastName,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            firstName === '' ||
            lastName === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                className="form-control"
                                name="firstName"
                                value={firstName}
                                onChange={this.onChange}
                                type="text"
                                placeholder="First Name"
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                className="form-control"
                                name="lastName"
                                value={lastName}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                </div>
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
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Confirm Password</label>
                    <input
                        className="form-control"
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </div>
                <button
                    className="btn btn-success" 
                    disable={isInvalid} 
                    type="submit"
                >Sign Up</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = (props) => (
    <p>
        Don't have an account? <button className='btn btn-success' onClick={props.handleSignUpClick}>Sign Up</button>
    </p>
);

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };