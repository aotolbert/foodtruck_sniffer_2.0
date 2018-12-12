import React from "react";
import { ExpandBtn } from '../../../components/PanelButtons';
import { Container } from '../../Grid'

const DefaultPanel = props => (
  <Container
  id="slideID">   
    <div id="slidepanel" data-flag="defaultPanel">
    <ExpandBtn
    onClick= {props.onClickExpand()}
    >More Info</ExpandBtn><br/>
    This should display at first.
  </div>

  </Container>

  );

  export default DefaultPanel;
  
  