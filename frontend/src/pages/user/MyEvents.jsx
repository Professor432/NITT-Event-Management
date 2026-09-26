import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import events from "../../data/events";

function MyEvents() {

  const registeredEvents = events.slice(0, 2);

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

            <h1>
              My Registered Events
            </h1>

            <p>
              Events you have registered for.
            </p>

          </section>


          <div className="registered-events">

            {registeredEvents.map((event) => (

              <div
                className="registered-event"
                key={event.id}
              >

                <div className="registered-event-info">

                  <div className="registered-event-icon">
                    {event.icon}
                  </div>

                  <div>

                    <h3>
                      {event.title}
                    </h3>

                    <p>
                      📅 {event.date}
                    </p>

                  </div>

                </div>


                <div className="my-event-actions">

                  <span className="registered-status">
                    ✓ Registered
                  </span>

                  <button className="view-button">
                    View Details
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}

export default MyEvents;