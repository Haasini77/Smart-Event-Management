import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* NAVBAR */}

      <nav className="navbar">

        <Link to="/" className="nav-logo">
          <span className="logo-box">EH</span>
          EventHub
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <a href="#about">About</a>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

      </nav>


      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            SMART EVENT REGISTRATION & MANAGEMENT
          </span>

          <h1>
            Discover.
            <br />
            Register.
            <br />
            <span>Experience.</span>
          </h1>

          <p>
            Discover college events, workshops, seminars,
            technical fests and exciting activities.
            Register online and manage your events easily
            with EventHub.
          </p>

          <div className="hero-buttons">

            <Link
              to="/events"
              className="primary-button"
            >
              Explore Events
            </Link>

            <Link
              to="/register"
              className="secondary-button"
            >
              Create Account
            </Link>

          </div>

        </div>


        <div className="hero-visual">

          <div className="hero-card">

            <div className="hero-icon">
              📅
            </div>

            <h2>EventHub</h2>

            <p>
              Your Campus. Your Events.
            </p>

          </div>

        </div>

      </section>


      {/* ABOUT */}

      <section
        id="about"
        className="section"
      >

        <h2 className="section-title">
          Why EventHub?
        </h2>

        <p className="section-subtitle">
          Everything you need to manage college events
          in one place.
        </p>


        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🔎</div>

            <h3>
              Discover Events
            </h3>

            <p>
              Find technical events, workshops,
              seminars and college activities.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">📝</div>

            <h3>
              Easy Registration
            </h3>

            <p>
              Register for events quickly with
              a simple online process.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">📊</div>

            <h3>
              Manage Events
            </h3>

            <p>
              Organizers can create and manage
              events easily.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">🔐</div>

            <h3>
              Secure Access
            </h3>

            <p>
              User authentication keeps your
              EventHub account protected.
            </p>
          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="footer">

        <h2>EventHub</h2>

        <p>
          Smart Event Registration & Management System
        </p>

        <p>
          © 2026 EventHub. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;