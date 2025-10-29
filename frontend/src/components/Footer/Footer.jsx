import React from 'react';
import Button from '../Button/Button';
import './Footer.css';
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <div className="brand"><span>T</span>imely</div>
            <h4>Contact Us</h4>
            <p>Email: timely@gmail.com</p>
            <p>Call : +123 400 123</p>
          </div>
          <div className="footer-column">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/service">Services</Link>
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