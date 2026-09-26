import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import events from "../../data/events";

function ManageEvents() {
    const navigate = useNavigate();
    const handleAdd = () => {
    navigate("/admin/events/add");
    };

    const handleEdit = (id) => {
    navigate(`/admin/events/edit/${id}`);
    };

    const handleView = (id) => {
    navigate(`/admin/events/${id}`);
    };

    const handleDelete = (id) => {
        alert(`Delete event ${id} - functionality will be added later.`);
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

          <div className="manage-header">

            <div>
              <h1>Manage Events</h1>

              <p>
                Create, edit and manage department events.
              </p>
            </div>

            <button
              className="add-event-button"
              onClick={handleAdd}
            >
              + Add Event
            </button>

          </div>


          <div className="admin-events-container">

            {events.map((event) => (

              <div
                className="admin-event-card"
                key={event.id}
              >

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

        </div>

      </main>

    </div>
  );
}

export default ManageEvents;