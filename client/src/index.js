import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Firebase, { FirebaseContext } from './components/Firebase';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
        <App />, document.getElementById("root") 
);


serviceWorker.register();


