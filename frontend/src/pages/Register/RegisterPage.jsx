import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../auth/useAuth.js";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await register(username, email, password);
      navigate("/login", { replace: true });
    } catch (error) {
      setErr(error.message);
    } finally {
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

          <h2 className="title">Sign up for free today!</h2>

          <form className="form" onSubmit={onSubmit}>
            <input
              type="text"
              name="username"
              autoComplete="username"
              placeholder="Username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
              autoComplete="new-password"
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit-button">
              REGISTER
            </button>
            {err && <p style={{ color: "#d33", fontSize: 14, marginTop: 8 }}>{err}</p>}
          </form>

          <p className="prompt">
            Already have an account?{" "}
            <Link to="/login" className="prompt-link">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
