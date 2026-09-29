import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import { getEventById } from "../../api/eventApi";
import { getEventRegistrations } from "../../api/registrationApi";

function EventRegistrations() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getEventById(id), getEventRegistrations(id)])
      .then(([eventData, registrationData]) => {
        setEvent(eventData);
        setRegistrations(registrationData);
      })
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="dashboard-layout">
      <Sidebar userType="admin" />
      <main className="main-content">
        <TopNavbar userName="Admin" role="Administrator" />
        <div className="dashboard-content">
          <button className="back-button" onClick={() => navigate(`/admin/events/${id}`)}>
            Back to event
          </button>
          <section className="registrations-page">
            <div className="registrations-heading">
              <div>
                <h1>Event registrations</h1>
                <p>{event?.title || "Registrants"}</p>
              </div>
              <strong>{registrations.length} registered</strong>
            </div>
            {loading && <p role="status">Loading registrations...</p>}
            {error && <p role="alert">Unable to load registrations: {error}</p>}
            {!loading && !error && registrations.length === 0 && (
              <p className="empty-events">No students have registered yet.</p>
            )}
            {!loading && registrations.length > 0 && (
              <div className="registrations-table-wrap">
                <table className="registrations-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Phone</th>
                      <th>Registered</th>
                      <th>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((registration) => (
                      <tr key={registration._id}>
                        <td>{registration.studentName}</td>
                        <td>{registration.email}</td>
                        <td>{registration.department}</td>
                        <td>{registration.phone}</td>
                        <td>{new Date(registration.registrationDate).toLocaleDateString("en-IN")}</td>
                        <td>{registration.notes || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default EventRegistrations;