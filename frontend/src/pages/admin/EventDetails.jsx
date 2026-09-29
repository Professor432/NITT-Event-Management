import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";

import { getEventById, deleteEvent } from "../../api/eventApi";


function EventDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Fetch event from backend
  useEffect(() => {

    const fetchEvent = async () => {

      try {

        setLoading(true);

        const data = await getEventById(id);

        setEvent(data);

      } catch (error) {

        console.error("Error fetching event:", error);

        setError("Failed to load event.");

      } finally {

        setLoading(false);

      }

    };

    fetchEvent();

  }, [id]);


  // Loading
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

            <h1>Loading event...</h1>

          </div>

        </main>

      </div>
    );

  }


  // Error / event not found
  if (error || !event) {

    return (
      <div className="dashboard-layout">

        <Sidebar userType="admin" />

        <main className="main-content">

          <TopNavbar
            userName="Admin"
            role="Administrator"
          />

          <div className="dashboard-content">

            <h1>Event not found</h1>

            <p>
              {error || "The requested event does not exist."}
            </p>

            <button
              className="back-button"
              onClick={() => navigate("/admin/events")}
            >
              ← Back to Events
            </button>

          </div>

        </main>

      </div>
    );

  }

  // delete
  const handleDelete = async () => {

  const confirmed = window.confirm(
    "Are you sure you want to delete this event?"
  );

  if (!confirmed) {
    return;
  }

  try {

    await deleteEvent(id);

    alert("Event deleted successfully!");

    navigate("/admin/events");

  } catch (error) {

    console.error(error);
    alert(error.message);

  }

};


  return (

    <div className="dashboard-layout">

      <Sidebar userType="admin" />

      <main className="main-content">

        <TopNavbar
          userName="Admin"
          role="Administrator"
        />

        <div className="dashboard-content">


          {/* BACK BUTTON */}

          <button
            className="back-button"
            onClick={() => navigate("/admin/events")}
          >
            ← Back to Events
          </button>


          {/* EVENT DETAILS */}

          <div className="event-detail-container">


            {/* HEADER */}

            <div className="event-detail-header">

              <div className="large-event-icon">
                📅
              </div>


              <div>

                <span className="event-status upcoming">
                  {event.status}
                </span>

                <h1>
                  {event.title}
                </h1>

                <p>
                  NIT Trichy Event
                </p>

              </div>

            </div>


            {/* CONTENT */}

            <div className="event-detail-content">


              {/* DESCRIPTION */}

              <div className="event-detail-main">

                <h2>
                  About This Event
                </h2>

                <p>
                  {event.description}
                </p>

              </div>


              {/* EVENT INFORMATION */}

              <div className="event-detail-info">


                <div className="detail-item">

                  <span>📅</span>

                  <div>

                    <small>Date</small>

                    <strong>
                      {new Date(event.startDate).toLocaleDateString()}
                    </strong>

                  </div>

                </div>


                <div className="detail-item">

                  <span>⏰</span>

                  <div>

                    <small>Time</small>

                    <strong>
                      {new Date(event.startDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                      {" - "}
                      {new Date(event.endDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </strong>

                  </div>

                </div>


                <div className="detail-item">

                  <span>📍</span>

                  <div>

                    <small>Venue</small>

                    <strong>
                      {event.venue?.name || event.venue || "Not specified"}
                    </strong>

                  </div>

                </div>


                <div className="detail-item">

                  <span>🏷️</span>

                  <div>

                    <small>Category</small>

                    <strong>
                      {event.category}
                    </strong>

                  </div>

                </div>


              </div>

            </div>


            {/* MANAGEMENT */}

            <div className="event-registration">

              <div>

                <h3>
                  Event Management
                </h3>

                <p>
                  Manage this event using the actions below.
                </p>

              </div>


              <div className="admin-event-actions">

                <button
                  className="view-button"
                  onClick={() => navigate(`/admin/events/${id}/registrations`)}
                >
                  View Registrations
                </button>


                {/* EDIT */}

                <button
                  className="edit-action"
                  onClick={() =>
                    navigate(`/admin/events/edit/${id}`)
                  }
                >
                  Edit Event
                </button>


                {/* DELETE */}

                <button
                  className="delete-action"
                  onClick={handleDelete}
                >
                  Delete Event
                </button>


              </div>

            </div>


          </div>

        </div>

      </main>

    </div>

  );

}


export default EventDetails;