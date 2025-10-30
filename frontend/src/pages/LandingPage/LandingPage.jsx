import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import './LandingPage.css';
import { Link } from 'react-router-dom';


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
              <Link to="/service"><Button>Get Started</Button></Link>
            </div>
            <div className="hero-image">
              <img src="./src/assets/Saly-10.png" alt="A person at a desk illustration" />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <div className="container">
            <div className="services-header">
                <h2>Service we provide</h2>
            </div>
            <p>Get started with one of these popular services</p>
            <div className="service-cards">
              {/* Service Cards */}
              <div className="service-card">
                 <div className="service-card-image-wrapper">
                    <img src="./src/assets/coding.png" alt="Service illustration" />
                    <div className="service-card-tag">Coding</div>
                 </div>
                <p>Duration: 60 mins</p>
                <div className="service-card-footer">
                  <span>$ 500</span>
                </div>
              </div>
              <div className="service-card">
                 <div className="service-card-image-wrapper">
                    <img src="./src/assets/design.png" alt="Service illustration" />
                    <div className="service-card-tag">Design</div>
                 </div>
                <p>Duration: 40 mins</p>
                <div className="service-card-footer">
                  <span>$ 200</span>
                </div>
              </div>
              <div className="service-card">
                 <div className="service-card-image-wrapper">
                    <img src="./src/assets/math.png" alt="Service illustration" />
                    <div className="service-card-tag">Math</div>
                 </div>
                <p>Duration: 30 mins</p>
                <div className="service-card-footer">
                  <span>$ 150</span>
                </div>
              </div>
               <div className="service-card">
                 <div className="service-card-image-wrapper">
                    <img src="./src/assets/business.png" alt="Service illustration" />
                    <div className="service-card-tag">Business</div>
                 </div>
                <p>Duration: 45 mins</p>
                <div className="service-card-footer">
                  <span>$ 300</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <div className="container">
            <h2>How It Works</h2>
            <div className="steps">
               <div className="step">
                        <p>Step 1:</p>
                        <h3>Browse Services</h3>
                    </div>
                    <div className="step-connector">&rarr;</div>
                    <div className="step">
                        <p>Step 2:</p>
                        <h3>Create Account</h3>
                    </div>
                     <div className="step-connector">&rarr;</div>
                    <div className="step">
                         <p>Step 3:</p>
                        <h3>Book a session</h3>
                    </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us-section">
          <div className="container why-choose-us-content">
            <div className="why-choose-us-image">
              <img src="./src/assets/rocket.png" alt="Person on a rocket illustration" />
            </div>
            <div className="why-choose-us-text">
              <h2>Why Choose Us</h2>
              <p>Timely provides a very simple scheduling for students to connect with tutors. Instead of back-and-forth emails or messages, everything happens in one place: browse services, pick a time, and confirm your appointment in just a few clicks.
              </p>
              <a href="/register"><Button>Sign up for Free</Button></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;