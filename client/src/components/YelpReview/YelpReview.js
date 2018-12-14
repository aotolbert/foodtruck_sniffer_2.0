import React from 'react';
import "./YelpReview.css";
import functions from '../../utils/functions'



const YelpReview = props => {
  return (
    <div>

      <div className="content">{props.content}</div>
      <div className="rating" dangerouslySetInnerHTML={{ __html:functions.renderStars(props.rating)}}></div>
      <div className="username">{props.username}</div>
    </div>
  )
};


export default YelpReview;