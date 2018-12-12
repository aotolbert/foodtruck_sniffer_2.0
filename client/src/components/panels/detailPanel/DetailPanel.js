import React from "react";
import { CollapseBtn } from '../../../components/PanelButtons';
import FavBtn from '../../FavBtn';
import UnFavBtn from '../../UnFavBtn';
const DetailPanel = props => (
    <div id="slidepanel" data-flag="DetailPanel">
    {!(props.deviceType==="desktop")?
     <CollapseBtn
     onClick={props.onClickCollapse()}
     >Back to Default</CollapseBtn> :
    
    <CollapseBtn
    onClick= {props.onClickCollapse()}
    >Back to Search</CollapseBtn>
}
    {  (props.currentTruck.isFavorite===false)
          ? <FavBtn 
          onClick={props.onClickFavorite()}
          data-id={props.currentTruck.id}
          />
          : <UnFavBtn
          onClick={props.onClickUnfavorite()}
          data-id={props.currentTruck.id}
          />
    }<br/>

    This is the DetailPanel!!
    Hope this is what you wanted to show :)


  </div>
  );
  
  export default DetailPanel;
