import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  capacity: number;
  registeredUsers: string[];
}

function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Get all events
  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/events"
      );

      const data = await response.json();

      if (response.ok) {
        setEvents(data.events);
      } else {
        setMessage("Failed to load events");
      }
    } catch (error) {
      console.error("Fetch events error:", error);
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Register for event
  const registerForEvent = async (eventId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/registrations/${eventId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Successfully registered for the event!");

      fetchEvents();
    } catch (error) {
      console.error("Registration error:", error);
      alert("Unable to connect to server");
    }
  };

  if (loading) {
    return (
      <div className="events-page">
        <div className="loading-box">
          <h2>Loading Events...</h2>
          <p>Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="events-page">

      {/* HEADER */}
      <div className="events-header">

        <div>
          <p className="events-small-title">
            EVENTHUB
          </p>

          <h1>
            Upcoming Events
          </h1>

          <p className="events-subtitle">
            Discover events and register for the ones you love.
          </p>
        </div>

        <button
          className="dashboard-button"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

      </div>

      {/* MESSAGE */}
      {message && (
        <div className="events-message">
          {message}
        </div>
      )}

      {/* EVENTS */}
      {events.length === 0 ? (
        <div className="no-events">
          <h2>No Events Available</h2>
          <p>
            There are currently no events to display.
          </p>
        </div>
      ) : (

        <div className="events-container">

          {events.map((event) => (

            <div
              className="event-card"
              key={event._id}
            >

              {/* CATEGORY */}
              <div className="event-category">
                {event.category}
              </div>

              {/* TITLE */}
              <h2 className="event-title">
                {event.title}
              </h2>

              {/* DESCRIPTION */}
              <p className="event-description">
                {event.description}
              </p>

              {/* DETAILS */}
              <div className="event-details">

                <div className="event-detail">
                  <span>📅</span>
                  <div>
                    <small>Date</small>
                    <strong>
                      {new Date(
                        event.date
                      ).toLocaleDateString()}
                    </strong>
                  </div>
                </div>

                <div className="event-detail">
                  <span>⏰</span>
                  <div>
                    <small>Time</small>
                    <strong>
                      {event.time}
                    </strong>
                  </div>
                </div>

                <div className="event-detail">
                  <span>📍</span>
                  <div>
                    <small>Location</small>
                    <strong>
                      {event.location}
                    </strong>
                  </div>
                </div>

              </div>

              {/* CAPACITY */}
              <div className="event-capacity">

                <span>
                  Registered
                </span>

                <strong>
                  {event.registeredUsers?.length || 0}
                  {" / "}
                  {event.capacity}
                </strong>

              </div>

              {/* REGISTER */}
              <button
                className="register-button"
                onClick={() =>
                  registerForEvent(event._id)
                }
              >
                Register Now
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Events;