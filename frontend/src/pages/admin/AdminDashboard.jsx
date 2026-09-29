import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import StatCard from "../../components/StatCard";

import { getEvents, deleteEvent } from "../../api/eventApi";


function AdminDashboard() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // FETCH EVENTS FROM DATABASE
  // ==========================================

  useEffect(() => {

    const fetchEvents = async () => {

      try {

        const data = await getEvents();

        setEvents(data);

      } catch (error) {

        console.error("Error fetching events:", error);

        alert("Failed to load events.");

      } finally {

        setLoading(false);

      }

    };

    fetchEvents();

  }, []);


  // ==========================================
  // CALCULATE EVENT STATUS
  // ==========================================

  const getEventStatus = (event) => {

    const now = new Date();

    const start = new Date(event.startDate);
    const end = new Date(event.endDate);


    if (now < start) {

      return "upcoming";

    }

    if (now >= start && now <= end) {

      return "ongoing";

    }

    return "completed";

  };


  // ==========================================
  // CALCULATE STATISTICS
  // ==========================================

  const upcomingEvents = events.filter(
    (event) => getEventStatus(event) === "upcoming"
  );


  const ongoingEvents = events.filter(
    (event) => getEventStatus(event) === "ongoing"
  );


  const completedEvents = events.filter(
    (event) => getEventStatus(event) === "completed"
  );


  // ==========================================
  // EVENTS FOR DASHBOARD
  //
  // Ongoing events
  // +
  // Upcoming events within next 14 days
  // ==========================================

  const now = new Date();

  const fourteenDaysFromNow = new Date(now);

  fourteenDaysFromNow.setDate(
    fourteenDaysFromNow.getDate() + 14
  );


  const dashboardEvents = events.filter((event) => {

    const status = getEventStatus(event);

    const startDate = new Date(event.startDate);


    // Show ALL ongoing events
    if (status === "ongoing") {

      return true;

    }


    // Show upcoming events within next 14 days
    if (
      status === "upcoming" &&
      startDate <= fourteenDaysFromNow
    ) {

      return true;

    }


    return false;

  });


  // Sort events by start date

  dashboardEvents.sort(
    (a, b) =>
      new Date(a.startDate) -
      new Date(b.startDate)
  );


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

  };


  // ==========================================
  // FORMAT TIME
  // ==========================================

  const formatTime = (startDate, endDate) => {

    const start = new Date(startDate);
    const end = new Date(endDate);


    const startTime = start.toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit"
      }
    );


    const endTime = end.toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit"
      }
    );


    return `${startTime} - ${endTime}`;

  };


  // ==========================================
  // VIEW EVENT
  // ==========================================

  const handleView = (eventId) => {

    navigate(`/admin/events/${eventId}`);

  };


  // ==========================================
  // EDIT EVENT
  // ==========================================

  const handleEdit = (eventId) => {

    navigate(`/admin/events/edit/${eventId}`);

  };


  // ==========================================
  // DELETE EVENT
  // ==========================================

  const handleDelete = async (eventId) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );


    if (!confirmed) {

      return;

    }


    try {

      await deleteEvent(eventId);


      // Remove event from dashboard
      setEvents((currentEvents) =>
        currentEvents.filter(
          (event) => event._id !== eventId
        )
      );


      alert("Event deleted successfully!");

    } catch (error) {

      console.error(error);

      alert(
        error.message ||
        "Failed to delete event."
      );

    }

  };


  // ==========================================
  // ADD EVENT
  // ==========================================

  const handleAddEvent = () => {

    navigate("/admin/events/add");

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="dashboard-layout">

        <Sidebar userType="admin" />

        <main className="main-content">

          <TopNavbar
            userName="Admin"
            role="Administrator"
          />

          <div className="dashboard-content">

            <h1>
              Loading dashboard...
            </h1>

          </div>

        </main>

      </div>

    );

  }


  // ==========================================
  // DASHBOARD
  // ==========================================

  return (

    <div className="dashboard-layout">


      {/* SIDEBAR */}

      <Sidebar userType="admin" />


      {/* MAIN CONTENT */}

      <main className="main-content">


        {/* NAVBAR */}

        <TopNavbar
          userName="Admin"
          role="Administrator"
        />


        <div className="dashboard-content">


          {/* WELCOME */}

          <section className="welcome-section">

            <h1>
              Welcome back, Admin 👋
            </h1>

            <p>
              Manage your department events from here.
            </p>

          </section>


          {/* =================================
              STATISTICS
          ================================= */}

          <section className="stats-grid">

            <StatCard
              title="Upcoming"
              count={upcomingEvents.length}
              icon="📅"
              description="Events coming soon"
            />


            <StatCard
              title="Ongoing"
              count={ongoingEvents.length}
              icon="🔴"
              description="Events happening now"
            />


            <StatCard
              title="Completed"
              count={completedEvents.length}
              icon="✅"
              description="Events completed"
            />

          </section>


          {/* =================================
              EVENTS SECTION
          ================================= */}

          <section className="dashboard-section">


            <div className="section-header">

              <div>

                <h2>
                  Manage Events
                </h2>

                <p>
                  Ongoing events and upcoming events
                  for the next 14 days.
                </p>

              </div>


              <button
                className="add-event-button"
                onClick={handleAddEvent}
              >
                + Add Event
              </button>

            </div>


            {/* =================================
                EVENTS
            ================================= */}

            <div className="admin-events-container">


              {dashboardEvents.length === 0 ? (

                <div className="no-events">

                  <h3>
                    No events to show
                  </h3>

                  <p>
                    There are no ongoing events or
                    upcoming events in the next 14 days.
                  </p>

                </div>

              ) : (

                dashboardEvents.map((event) => {

                  const status =
                    getEventStatus(event);


                  return (

                    <div
                      className="admin-event-card"
                      key={event._id}
                    >


                      {/* EVENT INFORMATION */}

                      <div className="admin-event-info">


                        <div className="event-icon">

                          {status === "ongoing"
                            ? "🔴"
                            : "📅"}

                        </div>


                        <div className="admin-event-details">


                          <div className="admin-event-title">


                            <h3>
                              {event.title}
                            </h3>


                            <span
                              className={`event-status ${status}`}
                            >
                              {status}
                            </span>


                          </div>


                          <p>
                            {event.description}
                          </p>


                          <div className="event-details">


                            <span>
                              📅{" "}
                              {formatDate(
                                event.startDate
                              )}
                            </span>


                            <span>
                              ⏰{" "}
                              {formatTime(
                                event.startDate,
                                event.endDate
                              )}
                            </span>


                            <span>
                              📍{" "}

                              {event.venue?.name ||
                                event.venue ||
                                "Venue not specified"}

                            </span>


                          </div>


                        </div>


                      </div>


                      {/* ACTION BUTTONS */}

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

                  );

                })

              )}

            </div>


          </section>


        </div>


      </main>


    </div>

  );

}


export default AdminDashboard;