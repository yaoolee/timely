import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import RegisterPage from './pages/Register/RegisterPage.jsx';

function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
    </>
  );
}

export default App
