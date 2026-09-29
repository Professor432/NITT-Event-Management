import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const AdminEvaluation = () => {
  const [selectedEvent, setSelectedEvent] = useState("event1");
  const [searchTerm, setSearchTerm] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      department: "CSE",
      status: "Registered",
      rating: 0,
      remarks: "",
      evaluated: false,
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      department: "ECE",
      status: "Registered",
      rating: 0,
      remarks: "",
      evaluated: false,
    },
    {
      id: 3,
      name: "Arjun Raj",
      email: "arjun@example.com",
      department: "CSE",
      status: "Registered",
      rating: 0,
      remarks: "",
      evaluated: false,
    },
    {
      id: 4,
      name: "Sneha Das",
      email: "sneha@example.com",
      department: "ECE",
      status: "Registered",
      rating: 0,
      remarks: "",
      evaluated: false,
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram@example.com",
      department: "CSE",
      status: "Registered",
      rating: 0,
      remarks: "",
      evaluated: false,
    },
  ]);

  const events = [
    {
      id: "event1",
      name: "National Symposium 2026",
      date: "15 October 2026",
      venue: "Barn Hall",
    },
    {
      id: "event2",
      name: "Technical Workshop on AI",
      date: "20 October 2026",
      venue: "Third I Building",
    },
    {
      id: "event3",
      name: "Department Technical Fest",
      date: "25 October 2026",
      venue: "Barn Hall",
    },
  ];

  const currentEvent = events.find(
    (event) => event.id === selectedEvent
  );

  const updateRating = (userId, rating) => {
    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === userId
          ? { ...user, rating }
          : user
      )
    );
  };

  const updateRemarks = (userId, remarks) => {
    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === userId
          ? { ...user, remarks }
          : user
      )
    );
  };

  const saveEvaluation = (userId) => {
    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === userId
          ? { ...user, evaluated: true }
          : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();

    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.department.toLowerCase().includes(search)
    );
  });

  const evaluatedCount = users.filter(
    (user) => user.evaluated
  ).length;

  return (
    <AdminLayout>
      <div className="admin-evaluation-page">

      {/* PAGE HEADER */}

      <div className="admin-evaluation-header">

        <div>
          <h1>User Evaluation</h1>

          <p>
            Evaluate registered participants for each departmental
            event and record their performance and participation.
          </p>
        </div>

      </div>


      {/* EVENT SELECTOR */}

      <div className="evaluation-event-selector">

        <div className="evaluation-event-selector-left">

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


        <div className="selected-event-details">

          <strong>
            {currentEvent?.name}
          </strong>

          <span>
            📅 {currentEvent?.date}
          </span>

          <span>
            📍 {currentEvent?.venue}
          </span>

        </div>

      </div>


      {/* STATISTICS */}

      <div className="evaluation-stats">

        <div className="evaluation-stat-card">

          <div className="evaluation-stat-icon">
            👥
          </div>

          <div>
            <span>Total Participants</span>
            <strong>{users.length}</strong>
          </div>

        </div>


        <div className="evaluation-stat-card">

          <div className="evaluation-stat-icon">
            ✅
          </div>

          <div>
            <span>Evaluated</span>
            <strong>{evaluatedCount}</strong>
          </div>

        </div>


        <div className="evaluation-stat-card">

          <div className="evaluation-stat-icon">
            ⏳
          </div>

          <div>
            <span>Pending</span>
            <strong>
              {users.length - evaluatedCount}
            </strong>
          </div>

        </div>


        <div className="evaluation-stat-card">

          <div className="evaluation-stat-icon">
            ⭐
          </div>

          <div>
            <span>Evaluation Scale</span>
            <strong>1 - 5</strong>
          </div>

        </div>

      </div>


      {/* USER EVALUATION */}

      <div className="evaluation-container">

        <div className="evaluation-container-header">

          <div>
            <h2>Registered Participants</h2>

            <p>
              Evaluate each registered participant for the selected event.
            </p>
          </div>


          <div className="evaluation-search">

            <input
              type="text"
              placeholder="Search participant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </div>

        </div>


        {/* USERS */}

        <div className="evaluation-user-list">

          {filteredUsers.length === 0 ? (

            <div className="evaluation-empty">

              <div>
                🔍
              </div>

              <h3>
                No Participants Found
              </h3>

              <p>
                No registered participant matches your search.
              </p>

            </div>

          ) : (

            filteredUsers.map((user) => (

              <div
                className="evaluation-user-card"
                key={user.id}
              >

                {/* USER INFORMATION */}

                <div className="evaluation-user-info">

                  <div className="evaluation-avatar">
                    {user.name.charAt(0)}
                  </div>

                  <div>

                    <h3>
                      {user.name}
                    </h3>

                    <p>
                      {user.email}
                    </p>

                    <span className="evaluation-department">
                      {user.department}
                    </span>

                  </div>

                </div>


                {/* RATING */}

                <div className="evaluation-rating">

                  <label>
                    Rating
                  </label>

                  <div className="rating-buttons">

                    {[1, 2, 3, 4, 5].map((rating) => (

                      <button
                        key={rating}
                        className={
                          user.rating === rating
                            ? "rating-button selected"
                            : "rating-button"
                        }
                        onClick={() =>
                          updateRating(user.id, rating)
                        }
                      >
                        {rating}
                      </button>

                    ))}

                  </div>

                </div>


                {/* REMARKS */}

                <div className="evaluation-remarks">

                  <label>
                    Remarks
                  </label>

                  <input
                    type="text"
                    placeholder="Add evaluation remarks..."
                    value={user.remarks}
                    onChange={(e) =>
                      updateRemarks(
                        user.id,
                        e.target.value
                      )
                    }
                  />

                </div>


                {/* STATUS / SAVE */}

                <div className="evaluation-action">

                  {user.evaluated && (
                    <span className="evaluation-saved">
                      ✓ Saved
                    </span>
                  )}

                  <button
                    className="save-evaluation-button"
                    onClick={() =>
                      saveEvaluation(user.id)
                    }
                  >
                    Save Evaluation
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      </div>
    </AdminLayout>
  );
};

export default AdminEvaluation;
