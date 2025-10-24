import './Register.css';

export default function RegisterPage() {
  return (
    <>
    <div className="page-container">
        <div className="card">
          <a href="/" className="back-link">Back</a>
          
          <h1 className="logo">
            <span className="logo-t">T</span>
            <span className="logo-imely">imely</span>
          </h1>
          
          <h2 className="title">Sign up for free today!</h2>
          
          <form className="form">
            <input type="text" placeholder="Username" className="form-input" />
            <input type="email" placeholder="Email" className="form-input" />
            <input type="password" placeholder="Password" className="form-input" />
            <button type="submit" className="submit-button">REGISTER</button>
          </form>
          
          <p className="prompt">
            Already have an account? <a href="#" className="prompt-link">Sign in instead</a>
          </p>
        </div>
      </div>
    </>
  );
}