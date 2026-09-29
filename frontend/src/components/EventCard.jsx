import { useNavigate } from "react-router-dom";

function EventCard({ event, showRegister = false, registered = false, returnTo = "/user/dashboard" }) {

  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/user/events/${event._id}`, { state: { from: returnTo } });
  };

  return (
    <div className="event-card">

      <div className="event-card-header">

        <div className="event-icon">
          {event.icon || "📅"}
        </div>

        <span className={`event-status ${event.status?.toLowerCase()}`}>
          {event.status}
        </span>

      </div>


      <div className="event-card-body">
        <h3>
          {event.title}
        </h3>


        <p className="event-description">
          {event.description}
        </p>


      <div className="event-details">

        <span>
          📅 {event.date}
        </span>

        <span>
          ⏰ {event.time}
        </span>

        <span>
          📍 {event.venue}
        </span>

      </div>
      </div>


      <div className="event-card-footer">

        <div>
          <p className="organizer">
            Organized by {event.organizer}
          </p>
        </div>

        <div className="event-card-actions">
          {showRegister && (registered || event.status !== "completed") && (
            <button
              className={registered ? "registered-card-action" : "register-card-action"}
              onClick={() => !registered && navigate(`/user/events/${event._id}/register`)}
              disabled={registered}
            >
              {registered ? "Registered" : "Register"}
            </button>
          )}
          <button className="view-button" onClick={handleView}>
            View Details
          </button>
        </div>

      </div>

    </div>
  );
}

export default EventCard;