import React from 'react';
import { ListItem } from '../../List/ListItem';
import { CollapseBtn } from '../../../components/PanelButtons';
import { Col, Row } from '../../Grid';
import functions from '../../../utils/functions';

const SearchPanel = props => (
  <div id="slidepanel">
    {!(props.deviceType === 'desktop') ? (
      <CollapseBtn onClick={props.onClickCollapse()}>Default View</CollapseBtn>
    ) : null}
    <div className="input-group mb-3 mt-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa fa-search" aria-hidden="true" />
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
    <div className="row bg-1 m-0">
      {props.truckList.map(truck => (
        <ListItem
          key={truck.id}
          onClick={() => {
            props.onClickSearchTile(truck);
          }}
        >
          <Row>
            <Col size="4">
              <img
                className="img3"
                src={truck.image}
                alt={`${truck.name} Profile Pic`}
              />
            </Col>
            <Col size="8" className="bg-1">
              <h6>{truck.name}</h6>
              Distance: {truck.distance} mi
              <br />
              <div
                dangerouslySetInnerHTML={{
                  __html: functions.renderStars(truck.overallRating)
                }}
              />
            </Col>
          </Row>
        </ListItem>
      ))}
    </div>
  </div>
);

export default SearchPanel;
