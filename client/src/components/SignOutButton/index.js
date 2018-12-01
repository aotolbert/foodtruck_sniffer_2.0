import React from 'react';

import { withFirebase } from '../Firebase';
import { defaultProps } from 'recompose';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
  {/* <button type="button" onClick={props.handleLogOutClick}> */}
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);