import React from "react";

export const SearchBtn = props => (
  <button {...props} style={{ marginTop: 10 }} className="btn2 btn-success">
    {props.children}
  </button>
);