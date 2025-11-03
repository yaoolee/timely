import React, { useState } from "react";
import "./BookingPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router-dom";

export default function BookingPage() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const location = useLocation();
  const serviceName = location.state?.serviceName || "";
  const instructorName = location.state?.instructorName || "";

  const availableTimes = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "4:00 PM",
    "5:00 PM",
    "7:00 PM",
  ];

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    const paddingDays = Array(firstDayIndex).fill(null);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...paddingDays, ...daysArray];
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
    setSelectedDate(null);
  };

  const handleDateSelect = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
    setBookingConfirmed(false);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setBookingConfirmed(false);
  };

  const handleBooking = () => {
    setBookingConfirmed(true);
  };

  const getFormattedDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Header />
      <div className="booking-container">
        <h1 className="booking-title">Booking Calendar</h1>

        <div className="calendar-wrapper">
          <div className="calendar-card">
            <div className="calendar-header">
              <button onClick={handlePrevMonth}>&lt;</button>
              <h3>
                {monthName} {year}
              </h3>
              <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="calendar-grid days">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>
            <div className="calendar-grid dates">
              {generateCalendarDays().map((day, index) =>
                day ? (
                  <button
                    key={index}
                    className={`date-btn ${
                      selectedDate?.getDate() === day &&
                      selectedDate?.getMonth() === currentDate.getMonth()
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleDateSelect(day)}
                  >
                    {day}
                  </button>
                ) : (
                  <div key={index} className="padding-day"></div>
                )
              )}
            </div>
          </div>

          <div className="times-card">
            <h3>Available times</h3>
            <div className="times-grid">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`time-btn ${selectedTime === time ? "selected" : ""}`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            <button
              className="book-session-btn"
              disabled={!selectedDate || !selectedTime}
              onClick={handleBooking}
            >
              Book Session
            </button>
          </div>
        </div>

        {bookingConfirmed && (
          <div className="confirmation-card">
            <h2>Appointment booked successfully!</h2>
            <p className="confirmation-subtitle">
              Your booking has been scheduled for {getFormattedDate(selectedDate)} at {selectedTime}.
            </p>

            <div className="confirmation-details">
              <h4>Appointment Details</h4>
              <div className="detail-item">
                <span>Service</span>
                <strong>{serviceName || "—"}</strong>
              </div>
              <div className="detail-item">
                <span>Instructor</span>
                <strong>{instructorName || "—"}</strong>
              </div>
              <div className="detail-item">
                <span>Date</span>
                <strong>{getFormattedDate(selectedDate)}</strong>
              </div>
              <div className="detail-item">
                <span>Time</span>
                <strong>{selectedTime}</strong>
              </div>
            </div>

            <div className="confirmation-actions">
              <button className="btn-cancel">Cancel</button>
              <button className="btn-reschedule">Reschedule</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
