// Assuming you're using React/Next.js
import React from 'react';

const Card = ({ title, thumbnail, duration, views, time }) => (
  <div className="card">
    <img src={thumbnail.url} alt={title} className="card-thumbnail" />
    <div className="card-content">
      <h2 className="card-title">{title}</h2>
      <p className="card-duration">{duration}</p>
      <p className="card-views">{views} views</p>
      <p className="card-time">{new Date(time).toLocaleString()}</p>
    </div>
  </div>
);

export default Card;
