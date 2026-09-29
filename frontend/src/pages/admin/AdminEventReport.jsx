import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const AdminEventReport = () => {
  const [selectedEvent, setSelectedEvent] = useState("event1");

  const events = [
    {
      id: "event1",
      name: "National Symposium 2026",
      date: "15 October 2026",
      venue: "Barn Hall",
      department: "CSE",
      capacity: 1000,
      registered: 742,
      attended: 681,
      evaluated: 615,
      certificates: 590,
      status: "Completed",
    },
    {
      id: "event2",
      name: "Technical Workshop on AI",
      date: "20 October 2026",
      venue: "Third I Building",
      department: "ECE",
      capacity: 400,
      registered: 286,
      attended: 251,
      evaluated: 220,
      certificates: 210,
      status: "Completed",
    },
    {
      id: "event3",
      name: "Department Technical Fest",
      date: "25 October 2026",
      venue: "Barn Hall",
      department: "CSE",
      capacity: 1000,
      registered: 825,
      attended: 0,
      evaluated: 0,
      certificates: 0,
      status: "Upcoming",
    },
  ];

  const participants = [
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      department: "CSE",
      registrationDate: "02 Oct 2026",
      attendance: "Present",
      evaluation: "Completed",
      certificate: "Generated",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      department: "ECE",
      registrationDate: "03 Oct 2026",
      attendance: "Present",
      evaluation: "Completed",
      certificate: "Generated",
    },
    {
      id: 3,
      name: "Arjun Raj",
      email: "arjun@example.com",
      department: "CSE",
      registrationDate: "04 Oct 2026",
      attendance: "Present",
      evaluation: "Pending",
      certificate: "Pending",
    },
    {
      id: 4,
      name: "Sneha Das",
      email: "sneha@example.com",
      department: "ECE",
      registrationDate: "05 Oct 2026",
      attendance: "Absent",
      evaluation: "Pending",
      certificate: "Not Available",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram@example.com",
      department: "CSE",
      registrationDate: "06 Oct 2026",
      attendance: "Present",
      evaluation: "Completed",
      certificate: "Generated",
    },
  ];

  const currentEvent = events.find(
    (event) => event.id === selectedEvent
  );

  const attendancePercentage =
    currentEvent?.registered > 0
      ? Math.round(
          (currentEvent.attended / currentEvent.registered) * 100
        )
      : 0;

  const evaluationPercentage =
    currentEvent?.registered > 0
      ? Math.round(
          (currentEvent.evaluated / currentEvent.registered) * 100
        )
      : 0;

  const certificatePercentage =
    currentEvent?.registered > 0
      ? Math.round(
          (currentEvent.certificates / currentEvent.registered) * 100
        )
      : 0;

  return (
    <AdminLayout>
      <div className="admin-event-report-page">

      {/* PAGE HEADER */}

      <div className="admin-event-report-header">

        <div>
          <h1>Event Reports</h1>

          <p>
            View event registration, attendance, evaluation,
            and certificate information.
          </p>
        </div>

      </div>


      {/* EVENT SELECTOR */}

      <div className="event-report-selector">

        <div className="event-report-select-group">

          <label>
            Select Event
          </label>

          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            {events.map((event) => (
              <option
                key={event.id}
                value={event.id}
              >
                {event.name}
              </option>
            ))}
          </select>

        </div>


        <div className="event-report-basic-info">

          <div>
            <span>Event Date</span>
            <strong>{currentEvent?.date}</strong>
          </div>

          <div>
            <span>Venue</span>
            <strong>{currentEvent?.venue}</strong>
          </div>

          <div>
            <span>Department</span>
            <strong>{currentEvent?.department}</strong>
          </div>

          <div>
            <span>Status</span>

            <strong
              className={
                currentEvent?.status === "Completed"
                  ? "report-status completed"
                  : "report-status upcoming"
              }
            >
              {currentEvent?.status}
            </strong>
          </div>

        </div>

      </div>


      {/* SUMMARY CARDS */}

      <div className="event-report-stats">

        {/* REGISTERED */}

        <div className="event-report-stat-card">

          <div className="event-report-stat-icon">
            👥
          </div>

          <div>
            <span>Registered</span>
            <strong>
              {currentEvent?.registered}
            </strong>

            <small>
              Capacity: {currentEvent?.capacity}
            </small>
          </div>

        </div>


        {/* ATTENDANCE */}

        <div className="event-report-stat-card">

          <div className="event-report-stat-icon">
            ✅
          </div>

          <div>
            <span>Attendance</span>

            <strong>
              {currentEvent?.attended}
            </strong>

            <small>
              {attendancePercentage}% attended
            </small>
          </div>

        </div>


        {/* EVALUATION */}

        <div className="event-report-stat-card">

          <div className="event-report-stat-icon">
            ⭐
          </div>

          <div>
            <span>Evaluated</span>

            <strong>
              {currentEvent?.evaluated}
            </strong>

            <small>
              {evaluationPercentage}% evaluated
            </small>
          </div>

        </div>


        {/* CERTIFICATES */}

        <div className="event-report-stat-card">

          <div className="event-report-stat-icon">
            🏆
          </div>

          <div>
            <span>Certificates</span>

            <strong>
              {currentEvent?.certificates}
            </strong>

            <small>
              {certificatePercentage}% generated
            </small>
          </div>

        </div>

      </div>


      {/* REPORT OVERVIEW */}

      <div className="event-report-overview">

        <div className="event-report-overview-header">

          <div>
            <h2>Event Overview</h2>

            <p>
              Registration and participation summary for the
              selected event.
            </p>
          </div>

        </div>


        <div className="event-report-progress-section">

          {/* REGISTRATION */}

          <div className="report-progress-item">

            <div className="report-progress-label">
              <span>Registration</span>

              <strong>
                {currentEvent?.registered} /{" "}
                {currentEvent?.capacity}
              </strong>
            </div>

            <div className="report-progress-bar">
              <div
                className="report-progress-fill"
                style={{
                  width: `${Math.min(
                    (currentEvent?.registered /
                      currentEvent?.capacity) *
                      100,
                    100
                  )}%`,
                }}
              ></div>
            </div>

          </div>


          {/* ATTENDANCE */}

          <div className="report-progress-item">

            <div className="report-progress-label">
              <span>Attendance</span>

              <strong>
                {attendancePercentage}%
              </strong>
            </div>

            <div className="report-progress-bar">
              <div
                className="report-progress-fill"
                style={{
                  width: `${attendancePercentage}%`,
                }}
              ></div>
            </div>

          </div>


          {/* EVALUATION */}

          <div className="report-progress-item">

            <div className="report-progress-label">
              <span>Evaluation Completion</span>

              <strong>
                {evaluationPercentage}%
              </strong>
            </div>

            <div className="report-progress-bar">
              <div
                className="report-progress-fill"
                style={{
                  width: `${evaluationPercentage}%`,
                }}
              ></div>
            </div>

          </div>


          {/* CERTIFICATES */}

          <div className="report-progress-item">

            <div className="report-progress-label">
              <span>Certificate Generation</span>

              <strong>
                {certificatePercentage}%
              </strong>
            </div>

            <div className="report-progress-bar">
              <div
                className="report-progress-fill"
                style={{
                  width: `${certificatePercentage}%`,
                }}
              ></div>
            </div>

          </div>

        </div>

      </div>


      {/* PARTICIPANT REPORT */}

      <div className="event-participant-report">

        <div className="event-participant-report-header">

          <div>
            <h2>Participant Report</h2>

            <p>
              Detailed information about users registered
              for this event.
            </p>
          </div>

          <button
            className="report-print-button"
            onClick={() => window.print()}
          >
            🖨️ Print Report
          </button>

        </div>


        {/* TABLE */}

        <div className="event-report-table-wrapper">

          <table className="event-report-table">

            <thead>

              <tr>
                <th>Participant</th>
                <th>Department</th>
                <th>Registration</th>
                <th>Attendance</th>
                <th>Evaluation</th>
                <th>Certificate</th>
              </tr>

            </thead>


            <tbody>

              {participants.map((participant) => (

                <tr key={participant.id}>

                  <td>

                    <div className="report-participant">

                      <div className="report-avatar">
                        {participant.name.charAt(0)}
                      </div>

                      <div>
                        <strong>
                          {participant.name}
                        </strong>

                        <span>
                          {participant.email}
                        </span>
                      </div>

                    </div>

                  </td>


                  <td>
                    <span className="report-department">
                      {participant.department}
                    </span>
                  </td>


                  <td>
                    {participant.registrationDate}
                  </td>


                  <td>

                    <span
                      className={
                        participant.attendance === "Present"
                          ? "report-pill present"
                          : "report-pill absent"
                      }
                    >
                      {participant.attendance}
                    </span>

                  </td>


                  <td>

                    <span
                      className={
                        participant.evaluation === "Completed"
                          ? "report-pill completed"
                          : "report-pill pending"
                      }
                    >
                      {participant.evaluation}
                    </span>

                  </td>


                  <td>

                    <span
                      className={
                        participant.certificate === "Generated"
                          ? "report-pill generated"
                          : participant.certificate === "Pending"
                          ? "report-pill pending"
                          : "report-pill unavailable"
                      }
                    >
                      {participant.certificate}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      </div>
    </AdminLayout>
  );
};

export default AdminEventReport;
