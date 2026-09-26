import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import StatCard from "../../components/StatCard";
import EventCard from "../../components/EventCard";

function UserDashboard() {

  const upcomingEvents = [
    {
      id: 1,
      icon: "🤖",
      title: "AI & Machine Learning Workshop",
      description:
        "Hands-on workshop covering the fundamentals of AI and Machine Learning.",
      date: "18 October 2026",
      time: "10:00 AM - 1:00 PM",
      venue: "Seminar Hall",
      organizer: "Department of Computer Applications",
      status: "Upcoming"
    },
    {
      id: 2,
      icon: "💻",
      title: "Web Development Workshop",
      description:
        "Learn modern web development technologies and build a complete web application.",
      date: "25 October 2026",
      time: "9:30 AM - 12:30 PM",
      venue: "Computer Lab 2",
      organizer: "Department of Computer Applications",
      status: "Upcoming"
    },
    {
      id: 3,
      icon: "📊",
      title: "Data Science Symposium",
      description:
        "A symposium focusing on current developments in Data Science and Analytics.",
      date: "2 November 2026",
      time: "10:00 AM - 4:00 PM",
      venue: "Main Auditorium",
      organizer: "Department of Computer Applications",
      status: "Upcoming"
    }
  ];

  const registeredEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Workshop",
      date: "18 October 2026",
      status: "Registered"
    },
    {
      id: 2,
      title: "Data Science Symposium",
      date: "2 November 2026",
      status: "Registered"
    }
  ];

  return (

    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <Sidebar userType="user" />

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* TOP NAVBAR */}
        <TopNavbar
          userName="John Doe"
          role="Student"
        />

        <div className="dashboard-content">

          {/* WELCOME SECTION */}
          <section className="welcome-section">

            <div>
              <h1>Good Morning, John 👋</h1>

              <p>
                Here's what's happening in your department.
              </p>
            </div>

          </section>


          {/* STAT CARDS */}
          <section className="stats-grid">

            <StatCard
              title="Upcoming"
              count="12"
              icon="📅"
              description="Events coming soon"
            />

            <StatCard
              title="Ongoing"
              count="2"
              icon="🔴"
              description="Events happening now"
            />

            <StatCard
              title="Completed"
              count="18"
              icon="✅"
              description="Events completed"
            />

          </section>


          {/* UPCOMING EVENTS */}
          <section className="dashboard-section">

            <div className="section-header">

              <div>
                <h2>Upcoming Events</h2>
                <p>Discover events happening soon.</p>
              </div>

              <button className="view-all-button">
                View All →
              </button>

            </div>


            <div className="events-grid">

              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ))}

            </div>

          </section>


          {/* MY REGISTERED EVENTS */}
          <section className="dashboard-section">

            <div className="section-header">

              <div>
                <h2>My Registered Events</h2>
                <p>Events you have registered for.</p>
              </div>

              <button className="view-all-button">
                View All →
              </button>

            </div>


            <div className="registered-events">

              {registeredEvents.map((event) => (

                <div
                  className="registered-event"
                  key={event.id}
                >

                  <div className="registered-event-info">

                    <div className="registered-event-icon">
                      📅
                    </div>

                    <div>
                      <h3>{event.title}</h3>
                      <p>{event.date}</p>
                    </div>

                  </div>

                  <span className="registered-status">
                    ✓ {event.status}
                  </span>

                </div>

              ))}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default UserDashboard;