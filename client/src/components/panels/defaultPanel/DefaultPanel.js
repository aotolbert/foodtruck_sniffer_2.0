import React from "react";
import { ExpandBtn, CollapseBtn } from '../../../components/PanelButtons';

const DefaultPanel = props => (
    <div id="slidepanel" data-flag="defaultPanel">
    <ExpandBtn
    onClick= {props.onClickExpand()}
    >More Info</ExpandBtn><br/>
    This should display at first.
  </div>
  );

  export default DefaultPanel;
  
  