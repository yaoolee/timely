import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import RegisterPage from './pages/Register/RegisterPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import ServicePage from './pages/ServicePage/ServicePage.jsx';


function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/service" element={<ServicePage />} />
      </Routes>
    </div>
    </>
  );
}

export default App
