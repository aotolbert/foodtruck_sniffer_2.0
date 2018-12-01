import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Map from "./pages/Map"
import NoMatch from "./pages/NoMatch";
import Header from "./components/Header";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import { withFirebase } from './components/Firebase';
import LoginControl from "./components/LoginControl";
import "./App.css";
require('dotenv').config()

class App extends Component {

  // state= {
  //   loggedIn: false
  // }
  constructor(props){
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount(){
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? this.setState({authUser})
      : this.setState({authUser: null});
    })
  }

  componentWillUnmount(){
    this.listener();
  }

  signIn = () => {
    // this.setState({ loggedIn: true });
    // console.log("logged in? " + this.state.loggedIn)
  }
  
  render() {
    return (
  <div>

  <Header
    authUser= {this.state.authUser}
    func= {this.signIn}
  />
                      {/* <LoginControl authUser={this.state.authUser}/> */}
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Map} />
        <Route exact path="/signUp" component={SignUpPage} />
        <Route exact path="/signIn" component={SignInPage} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
{/* <Map /> */}
  </div>
    );
  }
}
export default withFirebase(App);