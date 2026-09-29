import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import EventCard from "../../components/EventCard";
import { getEvents } from "../../api/eventApi";
import { getRegisteredEventIds } from "../../api/registrationApi";

function Events() {
  const [events, setEvents] = useState([]);
  const [registeredEventIds, setRegisteredEventIds] = useState(() => new Set());
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventData = await getEvents();
        setEvents(eventData);
        const profile = JSON.parse(localStorage.getItem("studentRegistrationProfile") || "{}");
        if (profile.email) {
          try {
            const registrationIds = await getRegisteredEventIds(profile.email);
            setRegisteredEventIds(new Set(registrationIds));
          } catch (statusError) {
            console.error("Failed to check registered events:", statusError);
          }
        }
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const getEventStatus = (event) => {
    if (event.status === "cancelled") return "completed";
    const now = new Date();
    if (now < new Date(event.startDate)) return "upcoming";
    if (now <= new Date(event.endDate)) return "ongoing";
    return "completed";
  };

  const visibleEvents = useMemo(() => {
    const priority = { ongoing: 0, upcoming: 1, completed: 2 };

    return events
      .filter((event) => filter === "all" || getEventStatus(event) === filter)
      .sort((first, second) => {
        const statusDifference = priority[getEventStatus(first)] - priority[getEventStatus(second)];
        if (statusDifference !== 0) return statusDifference;
        const dateDifference = new Date(first.startDate) - new Date(second.startDate);
        return getEventStatus(first) === "completed" ? -dateDifference : dateDifference;
      });
  }, [events, filter]);

  const filters = [
    ["all", "All Events"],
    ["ongoing", "Ongoing"],
    ["upcoming", "Upcoming"],
    ["completed", "Past Events"]
  ];

  return (
    <div className="dashboard-layout">

      <Sidebar userType="user" />

      <main className="main-content">

        <TopNavbar
          userName="John Doe"
          role="Student"
        />

        <div className="dashboard-content">

          <section className="welcome-section">

            <h1>All Events</h1>

            <p>
              Explore all events organized by the department.
            </p>

          </section>


          {/* FILTERS */}

          <div className="event-filters" role="group" aria-label="Filter events">
            {filters.map(([value, label]) => (
              <button
                className={`filter-button ${filter === value ? "active" : ""}`}
                key={value}
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
              >
                {label}
              </button>
            ))}
          </div>


          {/* EVENTS */}

          {loading && <p role="status">Loading events...</p>}
          {error && <p role="alert">Unable to load events: {error}</p>}
          {!loading && !error && visibleEvents.length === 0 && (
            <p className="empty-events">No events found for this filter.</p>
          )}
          {!loading && !error && visibleEvents.length > 0 && (
            <div className="events-grid">
              {visibleEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={{
                    ...event,
                    status: getEventStatus(event),
                    date: new Date(event.startDate).toLocaleDateString("en-IN", {
                      day: "numeric", month: "long", year: "numeric"
                    }),
                    time: `${new Date(event.startDate).toLocaleTimeString("en-IN", {
                      hour: "numeric", minute: "2-digit"
                    })} - ${new Date(event.endDate).toLocaleTimeString("en-IN", {
                      hour: "numeric", minute: "2-digit"
                    })}`,
                    venue: event.venue?.name || "Venue not specified",
                    organizer: event.department?.name || "NIT Trichy"
                  }}
                  showRegister
                  registered={registeredEventIds.has(event._id)}
                  returnTo="/user/events"
                />
              ))}
            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default Events;