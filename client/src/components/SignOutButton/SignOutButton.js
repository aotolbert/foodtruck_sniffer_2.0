import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button 
    type="button" 
    onClick={firebase.doSignOut}
    className="btn btn-light shadow signOut"  
  >
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);