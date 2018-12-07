import React from "react";

export const CollapseBtn = props => (
  <button {...props} style={{ marginBottom: 10 }} className="btn btn-success">
    {props.children}
  </button>
);