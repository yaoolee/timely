import "./LoginPage.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../auth/useAuth.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error.message);
    } finally {
      // Clear sensitive data from memory/UI after submit
      setPassword("");
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="card">
          <a href="/" className="back-link">
            Back
          </a>

          <h1 className="logo">
            <span className="logo-t">T</span>
            <span className="logo-imely">imely</span>
          </h1>

          <div className="text-wrapper">
            <h2 className="title">Welcome to Timely</h2>
            <p className="subtitle">Please sign-in to your account</p>
          </div>

          <form className="form" onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit-button">
              LOGIN
            </button>
            {err && <p style={{ color: "#d33", fontSize: 14, marginTop: 8 }}>{err}</p>}
          </form>

          <p className="prompt">
            New on our platform?{" "}
            <Link to="/register" className="prompt-link">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
