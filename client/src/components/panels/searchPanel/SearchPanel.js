import React from "react";
import {ListItem} from "../../List/ListItem"
import { ExpandBtn, CollapseBtn } from '../../../components/PanelButtons';



const SearchPanel = props => (
    <div id="slidepanel">
    <CollapseBtn
    onClick={props.onClickCollapse()}
    ></CollapseBtn><br/>
        <div className="input-field">
          <label>Search</label>
          <input type="text" className="searchBar" onKeyUp={props.handleSearch.bind(this)}/>
        </div>
      <div className="row">
                {props.truckList.map(truck => (
                  <ListItem key={truck.id}>
                  Truck name: {truck.name}
                  <br />
                  Distance from user: {truck.distance} Miles
                  </ListItem>
                ))}
        </div>
  </div>
  );
  
  export default SearchPanel;
