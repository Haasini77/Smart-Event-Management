import { Link, useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <div className="dashboard-logo">
          <span>EH</span>
          EventHub
        </div>

        <div className="dashboard-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="dashboard-container">
        <section className="welcome-section">
          <div>
            <p className="dashboard-label">USER DASHBOARD</p>

            <h1>
              Welcome, {user?.name || "EventHub User"} 👋
            </h1>

            <p>
              Manage your events and registrations from one place.
            </p>
          </div>
        </section>

        <section className="dashboard-cards">
          <div className="dashboard-card">
            <h2>📅 Browse Events</h2>
            <p>
              Discover upcoming college events, workshops,
              seminars and more.
            </p>
            <Link to="/events">View Events →</Link>
          </div>

          <div className="dashboard-card">
            <h2>🎟️ My Registrations</h2>
            <p>
              View the events you have registered for.
            </p>
            <Link to="/my-registrations">
              View Registrations →
            </Link>
          </div>

          <div className="dashboard-card">
            <h2>👤 My Profile</h2>
            <p>
              View your EventHub account information.
            </p>
            <span>{user?.email || "No email available"}</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserDashboard;