import React from "react";

export const ExpandBtn = props => (
  <button {...props} style={{ marginBottom: 10 }} className="btn btn-success">
    {props.children}
  </button>
);