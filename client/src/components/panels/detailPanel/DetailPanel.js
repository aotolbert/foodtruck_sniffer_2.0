import React from "react";
import { ExpandBtn, CollapseBtn } from '../../../components/PanelButtons';
// import { Col, Row, Container } from "../../Grid";

const DetailPanel = props => (
  
  <div id="slidepanel" data-flag="DetailPanel">
    <CollapseBtn
    onClick= {props.onClickCollapse}
    ></CollapseBtn>
    <h5>{props.currentTruck.name}</h5>
    <img className="img2" src={props.currentTruck.image}/>
    <br />

    Phone: {props.currentTruck.phone}<br/>
    Website: {props.currentTruck.url}<br/>
    Address: {props.currentTruck.address}<br/>
  </div>  
  );
  
  export default DetailPanel;
