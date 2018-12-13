import React from "react";

export const Container = ({ fluid, children, id }) => (
  <div className={`container${fluid ? "-fluid" : ""}`} id={`${id}`}>
    {children}
  </div>
);
