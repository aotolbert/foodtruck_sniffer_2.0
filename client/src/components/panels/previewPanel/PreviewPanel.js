import React from "react";
import { ExpandBtn, CollapseBtn } from '../../../components/PanelButtons';
import { Container } from '../../Grid'

const PreviewPanel = props => (
  <Container
  id="slideID">
    <div id="slidepanel">
    <ExpandBtn
    onClick= {props.onClickExpand()}
    >More Info</ExpandBtn>
    <br />
    <CollapseBtn
    onClick={props.onClickCollapse()}
    >Back to Search</CollapseBtn>
    <br/>      
    Truck: {props.currentTruck.name}<br/>
    Phone: {props.currentTruck.phone}<br/>
    Website: {props.currentTruck.url}<br/>
    Address: {props.currentTruck.address}<br />
    <img src={props.currentTruck.image} alt={`"Pictura de "${props.currentTruck.name}`}/>
  </div>
  </Container>
  );
  
  export default PreviewPanel;