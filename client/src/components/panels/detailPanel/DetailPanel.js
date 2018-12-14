
import React from "react";
import { CollapseBtn, TruckBtn } from '../../../components/PanelButtons';
import FavBtn from '../../FavBtn';
import UnFavBtn from '../../UnFavBtn';
import { Col, Row, Container } from "../../Grid"
import YelpReview from '../../YelpReview'
import functions from '../../../utils/functions'

const DetailPanel = props => (
  <div id="slidepanel" data-flag="DetailPanel">
    {!(props.deviceType === "desktop") ?
      <CollapseBtn
        onClick={props.onClickCollapse()}
      ></CollapseBtn> :

      <CollapseBtn
        onClick={props.onClickCollapse()}
      >Back to Search</CollapseBtn>
    }
    <h5>{props.currentTruck.name}</h5>
    <div className="text-center" dangerouslySetInnerHTML={{ __html: functions.renderStars(props.currentTruck.overallRating) }}></div>
    <img className="img2" src={props.currentTruck.image} />



    {/* <div id="slidepanel2" data-flag="DetailPanel"> */}
    <Row>
      <Col size="3">
        <TruckBtn
          onClick={props.currentTruck.phone}
        ><i class="fa fa-phone"></i></TruckBtn>
      </Col>
      <Col size="3">
        <TruckBtn
          onClick={props.currentTruck.phone}
        ><i class="fi-web"></i></TruckBtn>
      </Col>
      <Col size="3">
        <TruckBtn
          onClick={props.currentTruck.phone}
        ><i class="fa fa-compass"></i></TruckBtn>
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
    Phone: <br />
    Website: {props.currentTruck.url}<br />
    Address: {props.currentTruck.address}<br />

    {props.currentTruck.YelpReviews.map((review, index) => (
      <YelpReview content={review.content} rating={review.rating} username={review.username} key={index} />
    ))}
  </div>

  // </div>
);

export default DetailPanel;
