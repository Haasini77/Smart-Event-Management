import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyEvents.css";

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

function MyEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyEvents = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/registrations/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setEvents(data.events);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [navigate]);

  const cancelRegistration = async (eventId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this registration?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      setCancelling(eventId);

      const response = await fetch(
        `http://localhost:5000/api/registrations/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to cancel registration");
        return;
      }

      alert("Registration cancelled successfully!");

      setEvents((currentEvents) =>
        currentEvents.filter(
          (event) => event._id !== eventId
        )
      );

    } catch (error) {
      console.error("Cancel registration error:", error);
      alert("Unable to connect to server");
    } finally {
      setCancelling(null);
    }
  };

  if (loading) {
    return (
      <div className="my-events-page">
        <div className="no-events">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="my-events-page">

      <div className="my-events-header">

        <div>

          <h1>
            My Registered Events
          </h1>

          <p className="my-events-subtitle">
            Events you have registered for
          </p>

        </div>

        <button
          className="back-button"
          onClick={() => navigate("/events")}
        >
          Back to Events
        </button>

      </div>


      {events.length === 0 ? (

        <div className="no-events">

          <h2>
            No Registered Events
          </h2>

          <p>
            You have not registered for any events yet.
          </p>

        </div>

      ) : (

        <div className="my-events-container">

          {events.map((event) => (

            <div
              className="my-event-card"
              key={event._id}
            >

              <div className="my-event-category">
                {event.category}
              </div>


              <h2>
                {event.title}
              </h2>


              <p className="my-event-description">
                {event.description}
              </p>


              <div className="my-event-details">

                <div className="my-event-detail">
                  📅 <strong>Date:</strong>{" "}
                  {new Date(
                    event.date
                  ).toLocaleDateString()}
                </div>

                <div className="my-event-detail">
                  ⏰ <strong>Time:</strong>{" "}
                  {event.time}
                </div>

                <div className="my-event-detail">
                  📍 <strong>Location:</strong>{" "}
                  {event.location}
                </div>

              </div>


              <button
                className="cancel-button"
                onClick={() =>
                  cancelRegistration(event._id)
                }
                disabled={cancelling === event._id}
              >
                {cancelling === event._id
                  ? "Cancelling..."
                  : "Cancel Registration"}
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyEvents;