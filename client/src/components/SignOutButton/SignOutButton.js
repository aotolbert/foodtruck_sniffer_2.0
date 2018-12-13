import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button 
    type="button" 
    onClick={firebase.doSignOut}
    className="btn btn-light shadow"  
  >
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);