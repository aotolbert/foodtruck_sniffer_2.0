import React from 'react';
import "./YelpReview.css";
import functions from '../../utils/functions'



const YelpReview = props => {
  return (
    <div className="review">

      <div className="content">{props.content}</div>
      <span className="rating" dangerouslySetInnerHTML={{ __html:functions.renderStars(props.rating)}}></span> <span className="username">{props.username}</span>
    </div>
  // This is sample data for testing.
  //   <p>  

  //   <div className="content">I work in Uptown Charlotte so the options are truly endless when it comes to lunch options. The hardest part is making a decision on where to eat! </div>
  //   <span className="rating" dangerouslySetInnerHTML={{ __html:functions.renderStars(3)}}></span> <span className="username">Jim Bob</span>
  // </p>
  )
};


export default YelpReview;