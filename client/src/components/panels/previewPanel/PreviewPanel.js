import React from "react";
import { ExpandBtn, CollapseBtn } from '../../../components/PanelButtons';
import FavBtn from '../../FavBtn';

const PreviewPanel = props => (
    <div id="slidepanel">
    <ExpandBtn
    onClick= {props.onClickExpand()}
    >More Info</ExpandBtn>
    <br />
    <CollapseBtn
    onClick={props.onClickCollapse()}
    >Back to Search</CollapseBtn>
    <FavBtn 
    onClick={props.onClickFavorite()}
    />
    <br/>
    Truck: {props.currentTruck.name}<br/>
    Phone: {props.currentTruck.phone}<br/>
    Website: {props.currentTruck.url}<br/>
    Address: {props.currentTruck.address}<br />
    <img src={props.currentTruck.image}/>
  </div>
  );
  
  export default PreviewPanel;