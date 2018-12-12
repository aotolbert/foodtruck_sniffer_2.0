import React from "react";
import {ListItem} from "../../List/ListItem"
import { CollapseBtn } from '../../../components/PanelButtons';
import { Container } from '../../Grid'



const SearchPanel = props => (
<<<<<<< HEAD
  <Container
  id="slideID">
<div id="slidepanel">
    <CollapseBtn
    onClick={props.onClickCollapse()}
    >Back to Default</CollapseBtn><br/>
=======
    <div id="slidepanel">
    {!(props.deviceType==="desktop")?
     <CollapseBtn
     onClick={props.onClickCollapse()}
     >Back to Default</CollapseBtn> : null
    }
>>>>>>> 505cbfae48843805bdb43d242aefb6a5fc9a41e7
        <div className="input-field">
          <label>Search</label>
          <input type="text" onKeyUp={props.handleSearch.bind(this)}/>
        </div>
      <div className="row">
                {props.truckList.map(truck => (
                  <ListItem 
                  key={truck.id}
                  onClick={()=>{props.onClickSearchTile(truck)}}>
                  Truck name: {truck.name}
                  <br />
                  Distance from user: {truck.distance} Miles
                  </ListItem>
                ))}
        </div>
  </div>
  </Container>
    
  );
  
  export default SearchPanel;
