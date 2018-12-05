import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import { withFirebase } from './components/Firebase';
import AppWrap from "./pages/AppWrap";
import AdminPage from './pages/Admin/AdminPage'
import "./App.css";
import axios from "axios";
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
      authUser
        ? (this.setState({ authUser }),
          this.setState({ uid: authUser.uid }),
          axios.post(`/api/users/${authUser.uid}`, { fbId: authUser.fbId }),
          axios.get(`/api/users/${authUser.uid}`)
            .then(result => this.setState({ role: result.data.role }))
            .catch(err => console.log(err)))
        //Checks if user is in MYSQL DB.  Adds them if not.

        : (this.setState({ authUser: null, uid: null, role: null }))
      //Clears states when user is logged out.

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
              <Route path="/admin" render={(props) => (<AdminPage authUser={this.state.authUser} role={this.state.role}/>)}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default withFirebase(App);