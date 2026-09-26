import { useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";

import events from "../../data/events";


function EventDetails() {

  const { id } = useParams();

  const event = events.find(
    (event) => event.id === Number(id)
  );


  if (!event) {
    return <h1>Event not found</h1>;
  }


  return (

    <div className="dashboard-layout">

      <Sidebar userType="admin" />

      <main className="main-content">

        <TopNavbar
          userName="Admin"
          role="Administrator"
        />

        <div className="dashboard-content">

          <button className="back-button">
            ← Back to Events
          </button>


          <div className="event-detail-container">

            <div className="event-detail-header">

              <div className="large-event-icon">
                {event.icon}
              </div>


              <div>

                <span className="event-status upcoming">
                  {event.status}
                </span>

                <h1>
                  {event.title}
                </h1>

                <p>
                  Organized by {event.organizer}
                </p>

              </div>

            </div>


            <div className="event-detail-content">

              <div className="event-detail-main">

                <h2>
                  About This Event
                </h2>

                <p>
                  {event.description}
                </p>

              </div>


              <div className="event-detail-info">

                <div className="detail-item">
                  <span>📅</span>

                  <div>
                    <small>Date</small>
                    <strong>{event.date}</strong>
                  </div>
                </div>


                <div className="detail-item">
                  <span>⏰</span>

                  <div>
                    <small>Time</small>
                    <strong>{event.time}</strong>
                  </div>
                </div>


                <div className="detail-item">
                  <span>📍</span>

                  <div>
                    <small>Venue</small>
                    <strong>{event.venue}</strong>
                  </div>
                </div>


                <div className="detail-item">
                  <span>👥</span>

                  <div>
                    <small>Participants</small>

                    <strong>
                      {event.registered} / {event.capacity}
                    </strong>

                  </div>
                </div>

              </div>

            </div>


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

                <button className="edit-action">
                  Edit Event
                </button>

                <button className="delete-action">
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