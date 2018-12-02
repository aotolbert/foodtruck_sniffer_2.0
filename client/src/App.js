import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import { withFirebase } from './components/Firebase';
import AppWrap from "./pages/AppWrap";
import "./App.css";
require('dotenv').config()

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    })
  }

  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
      <div>


        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={(props) => (<AppWrap authUser={this.state.authUser} />)}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default withFirebase(App);