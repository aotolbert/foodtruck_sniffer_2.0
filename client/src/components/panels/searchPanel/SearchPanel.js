import React from 'react';
import { ListItem } from '../../List/ListItem';
import { CollapseBtn } from '../../../components/PanelButtons';
import { Col } from '../../Grid'
import functions from '../../../utils/functions';

const SearchPanel = props => (
  <div id="slidepanel">
    {!(props.deviceType === 'desktop') ? (
      <CollapseBtn onClick={props.onClickCollapse()}>
        Back to Default
      </CollapseBtn>
    ) : null}
    <div className="input-group mb-3 mt-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          <i class="fa fa-search" aria-hidden="true" />
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Find Food Trucks"
        aria-label="Search"
        aria-describedby="basic-addon1"
        onKeyUp={props.handleSearch.bind(this)}
      />
    </div>
    <div className="row m-0">
      {props.truckList.map(truck => (
        <ListItem
          key={truck.id}
          onClick={() => {
            props.onClickSearchTile(truck);
          }}
        >
          {/* <Col size="4">
    <img className="img2" src={props.currentTruck.image} />
    </Col> */}
          <Col size="12">
            Truck name: {truck.name}
            <br />
            Distance: {truck.distance} mi
            <br />
            <div
              dangerouslySetInnerHTML={{
                __html: functions.renderStars(truck.overallRating)
              }}
            />
          </Col>
        </ListItem>
      ))}
    </div>
  </div>
);

export default SearchPanel;
