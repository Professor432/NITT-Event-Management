function EventCard({ event }) {
  return (
    <div className="event-card">

      <div className="event-card-header">

        <div className="event-icon">
          {event.icon}
        </div>

        <span className={`event-status ${event.status.toLowerCase()}`}>
          {event.status}
        </span>

      </div>

      <div className="event-card-body">

        <h3>{event.title}</h3>

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

        <span className="organizer">
          Organized by <strong>{event.organizer}</strong>
        </span>

        <button className="view-button">
          View Details
        </button>

      </div>

    </div>
  );
}

export default EventCard;