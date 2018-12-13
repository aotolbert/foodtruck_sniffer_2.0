import React from "react";

export const FormBtn = props => (
  <button onClick={props.handleFormSubmit} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
    {props.children}
  </button>
);
