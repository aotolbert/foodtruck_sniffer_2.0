import React from "react";

export const FormBtn = props => (
  <button onClick={props.onClick} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
    {props.children}
  </button>
);
