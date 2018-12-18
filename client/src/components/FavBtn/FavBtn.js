import React from "react";
import "./FavBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const FavBtn = props => (
  <span className="btn btn-success" {...props}>
    <i className="fa fa-heart"></i>
  </span>
);

export default FavBtn;
