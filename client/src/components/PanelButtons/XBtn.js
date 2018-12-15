import React from "react";

export const XBtn = props => (
  <button {...props} style={{ marginBottom: 10 }} className="btn3 btn-success">
    {props.children}
  </button>
);