import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import { withFirebase } from './components/Firebase';
import AppWrap from "./pages/AppWrap";
import AdminPage from './pages/Admin/AdminPage'
import "./App.css";
import API from './utils/API'
require('dotenv').config()

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      role: null,
      uid: null
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      (authUser)
        ? (this.setState({ authUser }),
          this.setState({ uid: authUser.uid }),
          //adds uid to state
          API.findOrCreateUser({ uid: authUser.uid, fbId: authUser.fbId })
            .catch(err => console.log(err)),
          //Checks if user is in MYSQL DB.  Adds them if not.
          API.getUserRole({ uid: authUser.uid })
            .then(result => this.setState({ role: result.data.role }))
            .catch(err => console.log(err)))
        //Gets user role from db.

        : (this.setState({ authUser: null, uid: null, role: null }))
      //Clears states when user is logged out.

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
              <Route path="/admin" render={(props) => (<AdminPage authUser={this.state.authUser} role={this.state.role} />)}></Route>
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default withFirebase(App);