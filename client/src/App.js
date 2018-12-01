import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import AppWrap from "./pages/AppWrap";
import "./App.css";

class App extends Component {

  state= {
    loggedIn: false
  }

  
  render() {
    return (
  <div>


  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={AppWrap} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>

  </div>
    );
  }
}
export default App;