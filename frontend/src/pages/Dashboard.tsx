import { Link, useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };


  if (!user) {

    return (

      <div className="auth-page">

        <div className="auth-card">

          <h1>
            Login Required
          </h1>

          <p>
            Please login to view your dashboard.
          </p>

          <Link
            to="/login"
            className="primary-button"
          >
            Login
          </Link>

        </div>

      </div>
    );
  }


  return (

    <div className="dashboard-page">

      <nav className="navbar">

        <Link
          to="/"
          className="nav-logo"
        >
          <span className="logo-box">
            EH
          </span>

          EventHub
        </Link>


        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/events">
            Events
          </Link>

          <button
            className="nav-logout"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </nav>


      <main className="dashboard-container">

        <section className="dashboard-header">

          <div>

            <p className="dashboard-small">
              Welcome back
            </p>

            <h1>
              Hello, {user.name}! 👋
            </h1>

            <p>
              Manage your EventHub activities
              from one place.
            </p>

          </div>

        </section>


        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              🎫
            </div>

            <h3>
              Events
            </h3>

            <p>
              Explore Events
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              📋
            </div>

            <h3>
              Registrations
            </h3>

            <p>
              Manage registrations
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              👤
            </div>

            <h3>
              Profile
            </h3>

            <p>
              Your account
            </p>

          </div>

        </section>


        <section className="profile-card">

          <h2>
            My Profile
          </h2>


          <div className="profile-row">

            <span>
              Name
            </span>

            <strong>
              {user.name}
            </strong>

          </div>


          <div className="profile-row">

            <span>
              Email
            </span>

            <strong>
              {user.email}
            </strong>

          </div>


          <div className="profile-row">

            <span>
              Role
            </span>

            <strong>
              {user.role}
            </strong>

          </div>

        </section>


        <section>

          <h2 className="dashboard-section-title">
            Quick Actions
          </h2>


          <div className="quick-actions">

            {/* Browse Events */}

            <Link
              to="/events"
              className="quick-action"
            >

              <span>
                🎫
              </span>

              <div>

                <strong>
                  Browse Events
                </strong>

                <small>
                  Explore upcoming events
                </small>

              </div>

            </Link>


            {/* My Registered Events */}

            <Link
              to="/my-events"
              className="quick-action"
            >

              <span>
                📋
              </span>

              <div>

                <strong>
                  My Registrations
                </strong>

                <small>
                  View your registered events
                </small>

              </div>

            </Link>


            {/* Create Event */}

            <Link
              to="/admin/events"
              className="quick-action"
            >

              <span>
                ➕
              </span>

              <div>

                <strong>
                  Create Event
                </strong>

                <small>
                  Add a new event
                </small>

              </div>

            </Link>

          </div>

        </section>


      </main>

    </div>
  );
}

export default Dashboard;