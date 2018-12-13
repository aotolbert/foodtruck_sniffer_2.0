
import React from "react";
import { CollapseBtn } from '../../../components/PanelButtons';
import FavBtn from '../../FavBtn';
import UnFavBtn from '../../UnFavBtn';
import { Container } from "../../Grid"
import YelpReviews from "../../YelpReviews"

const DetailPanel = props => (
    <div id="slidepanel" data-flag="DetailPanel">
        {!(props.deviceType === "desktop") ?
            <CollapseBtn
                onClick={props.onClickCollapse()}
            >Back to Default</CollapseBtn> :

            <CollapseBtn
                onClick={props.onClickCollapse()}
            >Back to Search</CollapseBtn>
        }
        {(props.currentTruck.isFavorite === false)
            ? <FavBtn
                onClick={props.onClickFavorite()}
                data-id={props.currentTruck.id}
            />
            : <UnFavBtn
                onClick={props.onClickUnfavorite()}
                data-id={props.currentTruck.id}
            />
        }<br />

        <Container
            id="slideID">
            <div id="slidepanel2" data-flag="DetailPanel">

                <h5>{props.currentTruck.name}</h5>
                <img className="img2" src={props.currentTruck.image} />
                <br />

                Phone: {props.currentTruck.phone}<br />
                Website: {props.currentTruck.url}<br />
                Address: {props.currentTruck.address}<br />
            </div>
        </Container>
        ({props.currentTruck.YelpReviews})
        ?(
        <YelpReviews YelpReviews={props.currentTruck.YelpReviews} />)
        : No reviews
    </div>
);

export default DetailPanel;
