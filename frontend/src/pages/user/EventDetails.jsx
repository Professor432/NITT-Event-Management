import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";

import { getEventById } from "../../api/eventApi";


function EventDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backPath = location.state?.from || "/user/dashboard";

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // FETCH EVENT FROM DATABASE
  // ==========================================

  useEffect(() => {

    const fetchEvent = async () => {

      try {

        const data = await getEventById(id);

        setEvent(data);

      } catch (error) {

        console.error(
          "Error fetching event:",
          error
        );

        alert("Failed to load event.");

      } finally {

        setLoading(false);

      }

    };

    fetchEvent();

  }, [id]);


  // ==========================================
  // CALCULATE EVENT STATUS
  // ==========================================

  const getEventStatus = () => {

    if (!event) {
      return "";
    }

    const now = new Date();

    const start = new Date(event.startDate);
    const end = new Date(event.endDate);


    if (now < start) {
      return "upcoming";
    }


    if (now >= start && now <= end) {
      return "ongoing";
    }


    return "completed";

  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

  };


  // ==========================================
  // FORMAT TIME
  // ==========================================

  const formatTime = (startDate, endDate) => {

    const start = new Date(startDate);
    const end = new Date(endDate);


    const startTime =
      start.toLocaleTimeString(
        "en-IN",
        {
          hour: "numeric",
          minute: "2-digit"
        }
      );


    const endTime =
      end.toLocaleTimeString(
        "en-IN",
        {
          hour: "numeric",
          minute: "2-digit"
        }
      );


    return `${startTime} - ${endTime}`;

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="dashboard-layout">

        <Sidebar userType="user" />

        <main className="main-content">

          <TopNavbar
            userName="John Doe"
            role="Student"
          />

          <div className="dashboard-content">

            <h1>
              Loading event...
            </h1>

          </div>

        </main>

      </div>

    );

  }


  // ==========================================
  // EVENT NOT FOUND
  // ==========================================

  if (!event) {

    return (

      <div className="dashboard-layout">

        <Sidebar userType="user" />

        <main className="main-content">

          <TopNavbar
            userName="John Doe"
            role="Student"
          />

          <div className="dashboard-content">

            <h1>
              Event not found
            </h1>

            <button
              className="back-button"
              onClick={() =>
                navigate(backPath)
              }
            >
              ← Back to Dashboard
            </button>

          </div>

        </main>

      </div>

    );

  }


  const status = getEventStatus();


  // ==========================================
  // EVENT DETAILS
  // ==========================================

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


          {/* BACK BUTTON */}

          <button
            className="back-button"
            onClick={() =>
              navigate(backPath)
            }
          >
            ← Back to Dashboard
          </button>


          {/* EVENT DETAILS CONTAINER */}

          <div className="event-detail-container">


            {/* EVENT HEADER */}

            <div className="event-detail-header">


              <div className="large-event-icon">

                {status === "ongoing"
                  ? "🔴"
                  : "📅"}

              </div>


              <div>

                <span
                  className={`event-status ${status}`}
                >
                  {status}
                </span>


                <h1>
                  {event.title}
                </h1>


                <p>
                  Organized by{" "}

                  {event.department?.name ||
                    "Department of Computer Applications"}

                </p>

              </div>

            </div>


            {/* EVENT CONTENT */}

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


                {/* DATE */}

                <div className="detail-item">

                  <span>
                    📅
                  </span>

                  <div>

                    <small>
                      Date
                    </small>

                    <strong>

                      {formatDate(
                        event.startDate
                      )}

                      {formatDate(
                        event.startDate
                      ) !==
                        formatDate(
                          event.endDate
                        ) && (
                        <>
                          {" - "}
                          {formatDate(
                            event.endDate
                          )}
                        </>
                      )}

                    </strong>

                  </div>

                </div>


                {/* TIME */}

                <div className="detail-item">

                  <span>
                    ⏰
                  </span>

                  <div>

                    <small>
                      Time
                    </small>

                    <strong>
                      {formatTime(
                        event.startDate,
                        event.endDate
                      )}
                    </strong>

                  </div>

                </div>


                {/* VENUE */}

                <div className="detail-item">

                  <span>
                    📍
                  </span>

                  <div>

                    <small>
                      Venue
                    </small>

                    <strong>

                      {event.venue?.name ||
                        event.venue ||
                        "Venue not specified"}

                    </strong>

                  </div>

                </div>


                {/* AVAILABLE SEATS */}

                <div className="detail-item">

                  <span>
                    👥
                  </span>

                  <div>

                    <small>
                      Available Seats
                    </small>

                    <strong>

                      {event.capacity ||
                        "Not specified"}

                    </strong>

                  </div>

                </div>


              </div>

            </div>


            {/* REGISTRATION */}

            {status !== "completed" && event.status !== "cancelled" && (
            <div className="event-registration">


              <div>

                <h3>
                  Interested in attending?
                </h3>

                <p>
                  Register now to reserve your seat.
                </p>

              </div>


              <button
                className="register-button"
                onClick={() => navigate(`/user/events/${id}/register`)}
              >
                Register for Event
              </button>


            </div>
            )}


          </div>

        </div>

      </main>

    </div>

  );

}


export default EventDetails;