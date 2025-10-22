import React from 'react';
import Button from '../Button/Button';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <div className="logo">Timely</div>
            <h4>Contact Us</h4>
            <p>Email: timely@gmail.com</p>
            <p>Call : +123 400 123</p>
          </div>
          <div className="footer-column">
            <h4>Explore</h4>
            <a href="#">Home</a>
            <a href="#">Services</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-column">
            <div className="subscribe-form">
              <input type="email" placeholder="Email here" />
              <Button className="subscribe-button">Subscribe Now</Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;