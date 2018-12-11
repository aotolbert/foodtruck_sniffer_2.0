import React from "react";
import { ExpandBtn, CollapseBtn } from '../../../components/PanelButtons';

const DefaultPanel = props => (
    <div id="slidepanel" className="ml-2" data-flag="defaultPanel">
    <ExpandBtn
    onClick= {props.onClickExpand()}
    >Search</ExpandBtn><br/>
    
  </div>
  );

  export default DefaultPanel;
  
  