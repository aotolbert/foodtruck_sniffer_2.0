import React from "react";
import {ListItem} from "../../List/ListItem"
import { CollapseBtn } from '../../../components/PanelButtons';
import { Container } from '../../Grid'
import functions from '../../../utils/functions';



const SearchPanel = props => (
    <div id="slidepanel">
    {!(props.deviceType==="desktop")?
     <CollapseBtn
     onClick={props.onClickCollapse()}
     >Back to Default</CollapseBtn> : null
    }
        <div className="input-field">
          <label>Search</label>
          <input type="text" className="searchBar" onKeyUp={props.handleSearch.bind(this)}/>
        </div>
      <div className="row">
                {props.truckList.map(truck => (
                  <ListItem 
                  key={truck.id}
                  onClick={()=>{props.onClickSearchTile(truck)}}>
                  Truck name: {truck.name}
                  <br />
                  Distance from user: {truck.distance} Miles
                  <br />
                  <div dangerouslySetInnerHTML={{ __html:functions.renderStars(truck.overallRating)}}></div>
                  </ListItem>
                ))}
        </div>
  </div>
    
  );
  
  export default SearchPanel;
