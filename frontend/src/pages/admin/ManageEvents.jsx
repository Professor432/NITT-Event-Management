import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getEvents,
  deleteEvent
} from "../../api/eventApi";

import { getVenues } from "../../api/venueApi";


function ManageEvents() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // --------------------------------
  // Load events and venues
  // --------------------------------

  useEffect(() => {

    const loadData = async () => {

      try {

        setLoading(true);

        const [eventsData, venuesData] = await Promise.all([
          getEvents(),
          getVenues()
        ]);

        setEvents(eventsData);
        setVenues(venuesData);

      } catch (error) {

        console.error(error);
        setError(error.message);

      } finally {

        setLoading(false);

      }

    };

    loadData();

  }, []);


  // --------------------------------
  // Find venue name from ID
  // --------------------------------

  const getVenueName = (venueId) => {

    if (venueId && typeof venueId === "object") {
      return venueId.name || venueId._id;
    }

    const venue = venues.find(
      (item) => item._id === venueId
    );

    return venue ? venue.name : venueId;

  };

  const getEventStatus = (event) => {
    if (event.status?.toLowerCase() === "cancelled") return "completed";

    const now = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    if (now < startDate) return "upcoming";
    if (now <= endDate) return "ongoing";
    return "completed";
  };

  const visibleEvents = useMemo(() => {
    const priority = { ongoing: 0, upcoming: 1, completed: 2 };

    return events
      .filter((event) => filter === "all" || getEventStatus(event) === filter)
      .sort((first, second) => {
        const statusDifference =
          priority[getEventStatus(first)] - priority[getEventStatus(second)];
        if (statusDifference !== 0) return statusDifference;

        const dateDifference =
          new Date(first.startDate) - new Date(second.startDate);
        return getEventStatus(first) === "completed"
          ? -dateDifference
          : dateDifference;
      });
  }, [events, filter]);

  const filters = [
    ["all", "All Events"],
    ["ongoing", "Ongoing"],
    ["upcoming", "Upcoming"],
    ["completed", "Past Events"],
  ];


  // --------------------------------
  // Navigation
  // --------------------------------

  const handleAdd = () => {
    navigate("/admin/events/add");
  };


  const handleEdit = (id) => {
    navigate(`/admin/events/edit/${id}`);
  };


  const handleView = (id) => {
    navigate(`/admin/events/${id}`);
  };


  // --------------------------------
  // Delete
  // --------------------------------

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    try {

      await deleteEvent(id);

      // Remove deleted event from screen
      setEvents((currentEvents) =>
        currentEvents.filter(
          (event) => event._id !== id
        )
      );

      alert("Event deleted successfully!");

    } catch (error) {

      console.error(error);
      alert(error.message);

    }

  };


  // --------------------------------
  // Loading
  // --------------------------------

  if (loading) {

    return (
      <AdminLayout>
        <div className="dashboard-content">
          <h2>Loading events...</h2>
        </div>
      </AdminLayout>
    );

  }


  // --------------------------------
  // Error
  // --------------------------------

  if (error) {

    return (
      <AdminLayout>
        <div className="dashboard-content">
          <h2>Unable to load events</h2>
          <p>{error}</p>
        </div>
      </AdminLayout>
    );

  }


  // --------------------------------
  // Main UI
  // --------------------------------

  return (
    <AdminLayout>
      <div className="dashboard-content">

          <div className="manage-header">

            <div>

              <h1>All Events</h1>

              <p>
                Browse, review, and manage department events.
              </p>

            </div>


            <button
              className="add-event-button"
              onClick={handleAdd}
            >
              + Add Event
            </button>

          </div>


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


          <div className="admin-events-container">

            {visibleEvents.length === 0 ? (

              <div className="empty-state">

                <h3>
                  No events found for this filter
                </h3>

                <p>
                  Try another event category or create a new event.
                </p>

              </div>

            ) : (

              visibleEvents.map((event) => (

                <div
                  className="admin-event-card"
                  key={event._id}
                >

                  <div className="admin-event-info">


                    <div className="event-icon">
                      📅
                    </div>


                    <div className="admin-event-details">


                      <div className="admin-event-title">

                        <h3>
                          {event.title}
                        </h3>

                          <span className={`event-status ${getEventStatus(event)}`}>
                          {getEventStatus(event) === "completed"
                            ? "Past"
                            : getEventStatus(event)}
                        </span>

                      </div>


                      <p>
                        {event.description}
                      </p>


                      <div className="event-details">

                        <span>
                          📅{" "}
                          {new Date(
                            event.startDate
                          ).toLocaleDateString()}
                        </span>


                        <span>
                          ⏰{" "}
                          {new Date(
                            event.startDate
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>


                        <span>
                          📍{" "}
                          {getVenueName(event.venue)}
                        </span>

                        <span>
                          🏛️{" "}
                          {event.department?.name || "Department event"}
                        </span>

                      </div>


                    </div>

                  </div>


                  <div className="admin-event-actions">

                    <button
                      className="view-action"
                      onClick={() =>
                        handleView(event._id)
                      }
                    >
                      View
                    </button>


                    <button
                      className="edit-action"
                      onClick={() =>
                        handleEdit(event._id)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-action"
                      onClick={() =>
                        handleDelete(event._id)
                      }
                    >
                      Delete
                    </button>

                  </div>


                </div>

              ))

            )}

          </div>

      </div>
    </AdminLayout>
  );

}

export default ManageEvents;