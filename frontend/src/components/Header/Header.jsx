import React from 'react';
import './Header.css';
import '../Button/Button.css';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo"><span>T</span>imely</div>
          <nav className="nav">
            <a href="#" className="active">Home</a>
            <a href="#">Services</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
          <div className="header-actions">
            <Link to="/login" className="login-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 11V7C8 5.67392 8.52678 4.40215 9.46447 3.46447C10.4021 2.52678 11.6739 2 13 2C14.3261 2 15.5979 2.52678 16.5355 3.46447C17.4732 4.40215 18 5.67392 18 7V11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 12H7C5.89543 12 5 12.8954 5 14V20C5 21.1046 5.89543 22 7 22H19C20.1046 22 21 21.1046 21 20V14C21 12.8954 20.1046 12 19 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Login
            </Link>
            <Link to="/register" className="signup-button btn">Sign up</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;