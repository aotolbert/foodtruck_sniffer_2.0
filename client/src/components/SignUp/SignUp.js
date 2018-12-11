import React, { Component } from 'react';

import { withFirebase, FirebaseContext } from '../Firebase';
// import * as ROUTES from '../../../../routes';

const SignUpPage = props => (
    <div>
        <FirebaseContext.Consumer>
            {firebase => <SignUpForm firebase={firebase} handleToggle={props.handleToggle} />}
        </FirebaseContext.Consumer>
    </div>
);

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
    }

    state={
        firstName: '',
        lastName: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        error: null
    }



    onSubmit = event => {
        event.preventDefault();

        const INITIAL_STATE = {
            firstName: '',
            lastName: '',
            email: '',
            passwordOne: '',
            passwordTwo: '',
            error: null
        };

        const { email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.handleToggle().bind(this);
            })
            .catch(error => {
                this.setState({ error });
            });
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {

        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                className="form-control"
                                name="firstName"
                                value={this.state.firstName}
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
                                value={this.state.lastName}
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
                        value={this.state.email}
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
                        value={this.state.passwordOne}
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
                        value={this.state.passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </div>
                <button
                    className="btn btn-success" 
                    disable={true} 
                    type="submit"
                >Sign Up</button>

                {this.state.error &&   <div className="alert alert-danger mt-3" role="alert">
                                {this.state.error.message}
                            </div>}
            </form>
        );
    }
}

const SignUpLink = (props) => (
    <p className='mt-5'>
        Don't have an account? <button className='btn btn-success' onClick={props.handleSignUpClick}>Sign Up</button>
    </p>
);

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };