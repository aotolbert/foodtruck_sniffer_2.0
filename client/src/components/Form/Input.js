import React from "react";

export const Input = props => (
  <div className="form-group">
    <label htmlFor={props.elementId}>{props.label}</label>
    <input id={props.elementId} className="form-control" 
      onChange={props.handleInputChange}
    />
  </div>
);