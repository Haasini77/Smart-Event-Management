import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";

function CreateEvent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [capacity, setCapacity] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            date,
            time,
            location,
            category,
            capacity: Number(capacity),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create event");
        return;
      }

      setMessage("Event created successfully!");

      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setLocation("");
      setCategory("");
      setCapacity("");

      setTimeout(() => {
        navigate("/events");
      }, 1000);
    } catch (error) {
      console.error("Create event error:", error);
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ce-page">
      <div className="ce-card">

        <h1 className="ce-title">
          Create Event
        </h1>

        <p className="ce-subtitle">
          Add a new event to EventHub
        </p>

        <form
          className="ce-form"
          onSubmit={handleSubmit}
        >

          <label className="ce-label">
            Event Title
          </label>

          <input
            className="ce-input"
            type="text"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="ce-label">
            Description
          </label>

          <textarea
            className="ce-textarea"
            placeholder="Enter event description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label className="ce-label">
            Date
          </label>

          <input
            className="ce-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label className="ce-label">
            Time
          </label>

          <input
            className="ce-input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <label className="ce-label">
            Location
          </label>

          <input
            className="ce-input"
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label className="ce-label">
            Category
          </label>

          <input
            className="ce-input"
            type="text"
            placeholder="Technical / Cultural / Workshop"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <label className="ce-label">
            Capacity
          </label>

          <input
            className="ce-input"
            type="number"
            min="1"
            placeholder="Enter capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />

          {message && (
            <p className="ce-message">
              {message}
            </p>
          )}

          <button
            className="ce-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>

        </form>

        <button
          className="ce-back-button"
          type="button"
          onClick={() => navigate("/events")}
        >
          Back to Events
        </button>

      </div>
    </div>
  );
}

export default CreateEvent;