import React from "react";
import { ExpandBtn, CollapseBtn } from '../../../components/PanelButtons';
import FavBtn from '../../FavBtn';
import UnFavBtn from '../../UnFavBtn';
import functions from '../../../utils/functions'


const PreviewPanel = props => (

    <div id="slidepanel">
    <ExpandBtn
    onClick= {props.onClickExpand()}>
</ExpandBtn>
    <h5>{props.currentTruck.name}</h5>
    <div className="text-center" dangerouslySetInnerHTML={{ __html: functions.renderStars(props.currentTruck.overallRating) }}></div>
    <br />
    <img className="img2" src={props.currentTruck.image} alt={`${props.currentTruck.name} Profile Pic`}/>
    <br />
    <CollapseBtn
    onClick={props.onClickCollapse()}
    >Back to Search</CollapseBtn>
    {  (props.currentTruck.isFavorite===false)
          ? <FavBtn 
          onClick={props.onClickFavorite()}
          data-id={props.currentTruck.id}
          />
          : <UnFavBtn
          onClick={props.onClickUnfavorite()}
          data-id={props.currentTruck.id}
          />
    }
   
    <br/>
    Truck: {props.currentTruck.name}<br/>
    Phone: {props.currentTruck.phone}<br/>
    Website: {props.currentTruck.url}<br/>
    Address: {props.currentTruck.address}<br />
  </div>
  );
  
  export default PreviewPanel;