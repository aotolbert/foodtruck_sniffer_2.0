
import React from "react";
import { XBtn, CollapseBtn, TruckBtn } from '../../../components/PanelButtons';
import FavBtn from '../../FavBtn';
import UnFavBtn from '../../UnFavBtn';
import { Col, Row, Container } from "../../Grid"
import YelpReview from '../../YelpReview'
import functions from '../../../utils/functions'


const DetailPanel = props => (
  <div id="slidepanel" data-flag="DetailPanel">
    <div>
      {!(props.deviceType === "desktop") ?
        <CollapseBtn
          onClick={props.onClickCollapse()}
        ></CollapseBtn> :

        <XBtn
          onClick={props.onClickCollapse()}
        >X</XBtn>
      }
    </div>
    <h5>{props.currentTruck.name}</h5>
    <div className="text-center" dangerouslySetInnerHTML={{ __html: functions.renderStars(props.currentTruck.overallRating) }}></div>
    <br />

    <img className="img2" src={props.currentTruck.image} />


    <div className="details">
      {/* <div id="slidepanel2" data-flag="DetailPanel"> */}
      <Row>
        <Col size="3">
          <TruckBtn
            onClick={props.onClickPhone()}
          ><i className="fa fa-phone"></i></TruckBtn>
        </Col>
        <Col size="3">
          <TruckBtn
            onClick={props.onClickWebsite()}
          ><i className="fa fa-laptop"></i></TruckBtn>
        </Col>
        <Col size="3">
          <TruckBtn
            onClick={props.onClickDirections()}
          ><i className="fa fa-compass"></i></TruckBtn>
        </Col>
        <Col size="3">
          {(props.currentTruck.isFavorite === false)
            ? <FavBtn
              onClick={props.onClickFavorite()}
              data-id={props.currentTruck.id}
            />
            : <UnFavBtn
              onClick={props.onClickUnfavorite()}
              data-id={props.currentTruck.id}
            />
          }
        </Col>

      </Row>
    </div>
    <br />
    <div className="list-group">
      <a className="list-group-item list-group-item-action">Phone: {props.currentTruck.phone}</a>
      <a className="list-group-item list-group-item-action">Website: {props.currentTruck.url}</a>
      <a className="list-group-item list-group-item-action">Address: {props.currentTruck.address}</a>

      {props.currentTruck.YelpReviews.map((review, index) => (
        <YelpReview content={review.content} rating={review.rating} username={review.username} key={index} />
      ))}
    </div>
  </div>

  // </div>
);

export default DetailPanel;
