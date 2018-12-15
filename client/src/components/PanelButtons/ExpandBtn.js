import React from "react";

export const ExpandBtn = props => (
  <button {...props} style={{ marginTop: 10, marginBottom: 10 }} className="btn btn-success">
    {props.children}
  </button>
);