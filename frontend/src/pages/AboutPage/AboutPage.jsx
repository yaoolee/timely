import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="about-page">
        <section className="about-hero">
          <div className="container">
            <h1>About Timely</h1>
            <p>
              Timely makes it effortless for students to find the right tutor, pick a time, and book
              a session in minutes — no back-and-forth emails.
            </p>
          </div>
        </section>

        <section className="about-panels">
          <div className="container panels-grid">
            <div className="panel">
              <h3>Our Mission</h3>
              <p>
                Empower learners by connecting them with expert tutors through a seamless and modern
                booking experience.
              </p>
            </div>
            <div className="panel">
              <h3>What We Do</h3>
              <p>
                We offer a simple flow: browse services, choose an available time slot, and confirm
                your appointment, all in one place.
              </p>
            </div>
            <div className="panel">
              <h3>For Admins</h3>
              <p>
                Manage services, time slots, users, and appointments right from your browser. No
                manual database edits required.
              </p>
            </div>
          </div>
        </section>

        <section className="about-stats">
          <div className="container stats-row">
            <div className="stat">
              <strong>60+</strong>
              <span>Minutes saved per tutor weekly</span>
            </div>
            <div className="stat">
              <strong>99.9%</strong>
              <span>Uptime for scheduling</span>
            </div>
            <div className="stat">
              <strong>1-click</strong>
              <span>Booking & rescheduling</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
