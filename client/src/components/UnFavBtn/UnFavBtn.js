import React from "react";
import "./UnFavBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const UnFavBtn = props => (
  <span className="btn btn-danger" {...props}>
    UnSave
  </span>
);

export default UnFavBtn;
