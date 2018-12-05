import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import { withFirebase } from './components/Firebase';
import AppWrap from "./pages/AppWrap";
import Admin from './pages/Admin';
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
        ? (this.setState({ authUser }),
          this.setState({ uid: authUser.uid }))
        : (this.setState({ authUser: null }),
          this.setState({ uid: null }))

      //Route to check if user is in admin table and for favorites
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
              <Route exact path="/admin" component={Admin} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default withFirebase(App);