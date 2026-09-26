import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import StatCard from "../../components/StatCard";

function AdminDashboard() {

  const events = [
    {
      id: 1,
      icon: "🤖",
      title: "AI & Machine Learning Workshop",
      description:
        "Hands-on workshop covering the fundamentals of AI and Machine Learning.",
      date: "18 October 2026",
      time: "10:00 AM - 1:00 PM",
      venue: "Seminar Hall",
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
      status: "Upcoming"
    }
  ];


  const handleEdit = (eventId) => {
    console.log("Edit event:", eventId);
    alert("Edit functionality will be added in the next step.");
  };


  const handleDelete = (eventId) => {
    console.log("Delete event:", eventId);
    alert("Delete functionality will be added in the next step.");
  };


  const handleView = (eventId) => {
    console.log("View event:", eventId);
    alert("Event details will be added in the next step.");
  };


  const handleAddEvent = () => {
    alert("Add Event page will be added in the next step.");
  };


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


          {/* STATISTICS */}

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


          {/* MANAGE EVENTS */}

          <section className="dashboard-section">

            <div className="section-header">

              <div>

                <h2>
                  Manage Events
                </h2>

                <p>
                  Create, update and manage department events.
                </p>

              </div>


              <button
                className="add-event-button"
                onClick={handleAddEvent}
              >
                + Add Event
              </button>

            </div>


            {/* EVENTS TABLE */}

            <div className="admin-events-container">

              {events.map((event) => (

                <div
                  className="admin-event-card"
                  key={event.id}
                >

                  {/* EVENT INFORMATION */}

                  <div className="admin-event-info">

                    <div className="event-icon">
                      {event.icon}
                    </div>


                    <div className="admin-event-details">

                      <div className="admin-event-title">

                        <h3>
                          {event.title}
                        </h3>

                        <span className="event-status upcoming">
                          {event.status}
                        </span>

                      </div>


                      <p>
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

                  </div>


                  {/* ACTION BUTTONS */}

                  <div className="admin-event-actions">

                    <button
                      className="view-action"
                      onClick={() => handleView(event.id)}
                    >
                      View
                    </button>


                    <button
                      className="edit-action"
                      onClick={() => handleEdit(event.id)}
                    >
                      Edit
                    </button>


                    <button
                      className="delete-action"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;