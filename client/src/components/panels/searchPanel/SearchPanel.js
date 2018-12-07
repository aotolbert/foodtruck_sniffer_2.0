import React from "react";
import { ExpandBtn, CollapseBtn } from '../../../components/PanelButtons';

const SearchPanel = props => (
    <div id="slidepanel">
    <CollapseBtn
    onClick={props.onClickCollapse()}
    >Back to Default</CollapseBtn><br/>
    This is the searchPanel!!
    Hope this is what you wanted to show :)
  </div>
  );
  
  export default SearchPanel;
