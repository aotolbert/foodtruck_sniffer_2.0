
import React from "react";
import { ExpandBtn, CollapseBtn } from '../../../components/PanelButtons';
import { Col, Row, Container } from "../../Grid";

const DetailPanel = props => (
  <div>
  <CollapseBtn
  onClick= {props.onClickCollapse}
  ></CollapseBtn>
  

  <Container
  id="slideID">
    <div id="slidepanel2" data-flag="DetailPanel">

    <h5>{props.currentTruck.name}</h5>
    <img className="img2" src={props.currentTruck.image}/>
    <br />

    Phone: {props.currentTruck.phone}<br/>
    Website: {props.currentTruck.url}<br/>
    Address: {props.currentTruck.address}<br/>
  </div>  
  </Container>
  </div>
  );
  
  export default DetailPanel;
