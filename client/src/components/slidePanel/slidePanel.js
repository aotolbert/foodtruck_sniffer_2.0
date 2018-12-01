import React from "react";

const slidePanel = ({ children }) => (
  <div id="slidepanel" data-flag="SearchClosed">
  <input id="toggleButton" type="button" value="Close" />
  <p id="panelContent">
  "This is the default Bar View"
  </p>
</div>
);

export default slidePanel;