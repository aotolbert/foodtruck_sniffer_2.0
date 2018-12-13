import React from "react";

export const TruckBtn = props => (
  <button {...props} style={{ marginBottom: 0 }} className="btn btn-success">
    {props.children}
  </button>
);