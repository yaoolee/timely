import './LoginPage.css';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <>
      <div className="page-container">
        <div className="card">
          <a href="/" className="back-link">Back</a>
          
          <h1 className="logo">
            <span className="logo-t">T</span>
            <span className="logo-imely">imely</span>
          </h1>
          
          <div className="text-wrapper">
            <h2 className="title">Welcome to Timely</h2>
            <p className="subtitle">Please sign-in to your account</p>
          </div>
          
          <form className="form">
            <input type="email" placeholder="Email" className="form-input" />
            <input type="password" placeholder="Password" className="form-input" />
            <button type="submit" className="submit-button">LOGIN</button>
          </form>
          
          <p className="prompt">
            New on our platform? <Link to="/register" className="prompt-link">Create an account</Link>
          </p>
        </div>
      </div>
    </>
  );
}