import React from 'react';

const YelpReviews =props => {

  <ul className="list-group">
    {props.YelpReviews.map((review, index) => (
      <li key={index} className="list-group-item">
        <div className="text">{review.text}</div>
        <div className="rating">{review.rating}</div>
        <div className="name">{review.name}</div>
      </li>
    ))}
  </ul>
};


  export default YelpReviews;