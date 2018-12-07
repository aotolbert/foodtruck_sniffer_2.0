import React from "react";
import { ExpandBtn, CollapseBtn } from '../../../components/PanelButtons';

const DetailPanel = props => (
    <div id="slidepanel" data-flag="DetailPanel">
    <CollapseBtn
    onClick= {props.onClickCollapse}
    >Back to Default</CollapseBtn><br/>

    This is the DetailPanel!!
    Hope this is what you wanted to show :)


  </div>
  );
  
  export default DetailPanel;
