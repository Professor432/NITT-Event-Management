import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import EventCard from "../../components/EventCard";
import events from "../../data/events";

function Events() {

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

          <div className="event-filters">

            <button className="filter-button active">
              All Events
            </button>

            <button className="filter-button">
              Upcoming
            </button>

            <button className="filter-button">
              Ongoing
            </button>

            <button className="filter-button">
              Completed
            </button>

          </div>


          {/* EVENTS */}

          <div className="events-grid">

            {events.map((event) => (

              <EventCard
                key={event.id}
                event={event}
              />

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Events;