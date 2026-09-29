import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import StatCard from "../../components/StatCard";
import EventCard from "../../components/EventCard";

import { getEvents } from "../../api/eventApi";


function UserDashboard() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // FETCH EVENTS FROM DATABASE
  // ==========================================

  useEffect(() => {

    const fetchEvents = async () => {

      try {

        const data = await getEvents();

        setEvents(data);

      } catch (error) {

        console.error("Error fetching events:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchEvents();

  }, []);


  // ==========================================
  // CALCULATE EVENT STATUS
  // ==========================================

  const getEventStatus = (event) => {

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
  // EVENT COUNTS
  // ==========================================

  const upcomingEvents = events.filter(
    (event) =>
      getEventStatus(event) === "upcoming"
  );


  const ongoingEvents = events.filter(
    (event) =>
      getEventStatus(event) === "ongoing"
  );


  const completedEvents = events.filter(
    (event) =>
      getEventStatus(event) === "completed"
  );


  // ==========================================
  // UPCOMING EVENTS - NEXT 14 DAYS
  // ==========================================

  const now = new Date();

  const fourteenDaysFromNow = new Date(now);

  fourteenDaysFromNow.setDate(
    fourteenDaysFromNow.getDate() + 14
  );


  const upcomingTwoWeeks = upcomingEvents.filter(
    (event) => {

      const startDate = new Date(
        event.startDate
      );

      return (
        startDate >= now &&
        startDate <= fourteenDaysFromNow
      );

    }
  );


  // Sort upcoming events by date

  upcomingTwoWeeks.sort(
    (a, b) =>
      new Date(a.startDate) -
      new Date(b.startDate)
  );


  // Sort ongoing events by start date

  ongoingEvents.sort(
    (a, b) =>
      new Date(a.startDate) -
      new Date(b.startDate)
  );


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
  // CONVERT DATABASE EVENT
  // TO EventCard FORMAT
  // ==========================================

  const convertEventForCard = (event) => {

    return {

      ...event,

      id: event._id,

      icon:
        getEventStatus(event) === "ongoing"
          ? "🔴"
          : "📅",

      date: formatDate(event.startDate),

      time: formatTime(
        event.startDate,
        event.endDate
      ),

      venue:
        event.venue?.name ||
        event.venue ||
        "Venue not specified",

      status:
        getEventStatus(event),

      organizer:
        event.department?.name ||
        "Department of Computer Applications"

    };

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
              Loading events...
            </h1>

          </div>

        </main>

      </div>

    );

  }


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


          {/* =================================
              WELCOME
          ================================= */}

          <section className="welcome-section">

            <div>

              <h1>
                Good Morning, John 👋
              </h1>

              <p>
                Here's what's happening in your
                department.
              </p>

            </div>

          </section>


          {/* =================================
              STATISTICS
          ================================= */}

          <section className="stats-grid">

            <StatCard
              title="Upcoming"
              count={upcomingEvents.length}
              icon="📅"
              description="Events coming soon"
            />


            <StatCard
              title="Ongoing"
              count={ongoingEvents.length}
              icon="🔴"
              description="Events happening now"
            />


            <StatCard
              title="Completed"
              count={completedEvents.length}
              icon="✅"
              description="Events completed"
            />

          </section>


          {/* =================================
              ONGOING EVENTS

              ONLY SHOW SECTION IF EVENTS
              ARE CURRENTLY LIVE
          ================================= */}

          {ongoingEvents.length > 0 && (

            <section className="dashboard-section">

              <div className="section-header">

                <div>

                  <h2>
                    Ongoing Events
                  </h2>

                  <p>
                    Events happening right now.
                  </p>

                </div>

              </div>


              <div className="events-grid">

                {ongoingEvents.map((event) => (
                  <EventCard
                    key={event._id}
                    event={convertEventForCard(event)}
                  />
                ))}

              </div>

            </section>

          )}


          {/* =================================
              UPCOMING EVENTS

              ONLY NEXT 14 DAYS
          ================================= */}

          {upcomingTwoWeeks.length > 0 && (

            <section className="dashboard-section">

              <div className="section-header">

                <div>

                  <h2>
                    Upcoming Events
                  </h2>

                  <p>
                    Events happening in the next
                    2 weeks.
                  </p>

                </div>


                <button
                  className="view-all-button"
                  onClick={() =>
                    navigate("/events")
                  }
                >
                  View All →
                </button>

              </div>


              <div className="events-grid">

                {upcomingTwoWeeks.map((event) => (
                  <EventCard
                    key={event._id}
                    event={convertEventForCard(event)}
                  />
                ))}

              </div>

            </section>

          )}


          {/* =================================
              NOTHING TO SHOW
          ================================= */}

          {ongoingEvents.length === 0 &&
            upcomingTwoWeeks.length === 0 && (

              <section className="dashboard-section">

                <div className="no-events">

                  <h3>
                    No upcoming events
                  </h3>

                  <p>
                    There are no ongoing events
                    or upcoming events in the
                    next 2 weeks.
                  </p>

                </div>

              </section>

            )}


        </div>

      </main>

    </div>

  );

}


export default UserDashboard;