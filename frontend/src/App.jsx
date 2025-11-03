import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ServicePage from "./pages/ServicePage/ServicePage.jsx";
import BookingPage from "./pages/BookingPage/BookingPage.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import UserBoard from "./pages/UserBoard/UserBoard.jsx";

function App() {
  return (
    <>
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/service" element={<ServicePage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/dashboard" element={<UserBoard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
