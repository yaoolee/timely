import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import './LandingPage.css';


/* const LandingPage = () => {
  return (
    <div>
   <main>
    <Header />
    </main>
    <Footer />
    </div>
  );
}; */

const LandingPage = () => {
  return (
    <div className="landing-page">
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <Header />
          <div className="container hero-content">
            <div className="hero-text">
              <p className="subtitle">START TO SUCCESS</p>
              <h1>Book Tutoring Sessions Easily</h1>
              <p className="description">Find the right tutor and reserve a time slot in minutes.</p>
              <Button>Get Started</Button>
            </div>
            <div className="hero-image">
              <img src="./src/assets/Saly-10.png" alt="A person at a desk illustration" />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <div className="container">
            <h2>Service we provide</h2>
            <p>Get started with one of these popular services</p>
            <div className="service-cards">
              {/* Service Cards Here */}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <div className="container">
            <h2>How It Works</h2>
            <div className="steps">
              {/* Steps Here */}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us-section">
          <div className="container why-choose-us-content">
            <div className="why-choose-us-image">
              <img src="" alt="Person on a rocket illustration" />
            </div>
            <div className="why-choose-us-text">
              <h2>Why Choose Us</h2>
              <p>Timely provides a very simple scheduling for students to connect with tutors. Instead of back-and-forth emails or messages, everything happens in one place: browse services, pick a time, and confirm your appointment in just a few clicks.
              </p>
              <Button>Sign up for Free</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;