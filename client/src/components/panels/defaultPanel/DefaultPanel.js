import React from "react";
import { ExpandBtn } from '../../../components/PanelButtons';
import { Container } from '../../Grid'

const DefaultPanel = props => (
  <Container
  id="slideID">   
    <div id="slidepanel" className="ml-2" data-flag="defaultPanel">
    <ExpandBtn
    onClick= {props.onClickExpand()}
    >Search</ExpandBtn>
  </div>

  </Container>

  );

  export default DefaultPanel;
  
  