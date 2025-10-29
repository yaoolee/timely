import React from 'react';
import './ServiceCard.css';

// This component receives a single 'service' object as a prop
const ServiceCard = ({ service }) => {
  return (
    <div className="service-card-wrapper">
      <div className="service-card-main">
        <div className="service-header">
          <div className="service-image-placeholder" style={{ backgroundColor: service.bgColor }}>
            <img src={service.imageSrc || ''} alt={`${service.title} illustration`} />
          </div>
          <div className="service-details">
            <h3>{service.title}</h3>
            <p>Duration {service.duration}</p>
            <span>${service.price}</span>
          </div>
        </div>
        
        <h4>Service Info</h4>
        <p className="service-info-text">{service.serviceInfo}</p>
      </div>
      
      <div className="instructor-section">
        <h4>Your Instructor</h4>
        <div className="instructor-details">
          <div className="instructor-image-placeholder">
            <img src={service.instructorImageSrc || ''} alt={`${service.instructorName} portrait`} />
          </div>
          <div>
            <h5>{service.instructorName}</h5>
            <p>{service.instructorTitle}</p>
          </div>
        </div>
        <button className="book-now-btn">Book Now</button>
      </div>
    </div>
  );
};

export default ServiceCard;