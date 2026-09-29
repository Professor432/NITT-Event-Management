import UserLayout from "../../layouts/UserLayout";

const AdvertisementPublicity = () => {
  return (
    <UserLayout>
      <div className="advertisement-page">

      {/* PAGE HEADER */}
      <div className="advertisement-header">
        <div>
          <h1>Advertisement & Publicity</h1>

          <p>
            Discover event announcements, promotional activities,
            publicity materials, and important updates.
          </p>
        </div>
      </div>


      {/* HERO / INTRODUCTION */}
      <div className="advertisement-hero">

        <div className="advertisement-hero-icon">
          📢
        </div>

        <div>
          <h2>Stay Updated With Our Events</h2>

          <p>
            Get the latest information about upcoming events, workshops,
            seminars, symposiums, competitions, and other departmental
            activities.
          </p>
        </div>

      </div>


      {/* PUBLICITY CATEGORIES */}
      <div className="advertisement-section">

        <div className="advertisement-section-header">
          <h2>Publicity & Promotion</h2>

          <p>
            Explore the different ways event information is shared
            with participants and the campus community.
          </p>
        </div>


        <div className="advertisement-grid">

          {/* POSTERS */}
          <div className="advertisement-card">

            <div className="advertisement-card-icon">
              🖼️
            </div>

            <h3>Event Posters</h3>

            <p>
              View promotional posters containing important details
              such as event dates, venues, registration information,
              and contact details.
            </p>

            <button className="advertisement-button">
              View Posters
            </button>

          </div>


          {/* ANNOUNCEMENTS */}
          <div className="advertisement-card">

            <div className="advertisement-card-icon">
              📣
            </div>

            <h3>Announcements</h3>

            <p>
              Stay informed about registration deadlines, schedule
              changes, event updates, and other important announcements.
            </p>

            <button className="advertisement-button">
              View Announcements
            </button>

          </div>


          {/* SOCIAL MEDIA */}
          <div className="advertisement-card">

            <div className="advertisement-card-icon">
              📱
            </div>

            <h3>Social Media</h3>

            <p>
              Follow official event communication channels for updates,
              highlights, photographs, and promotional content.
            </p>

            <button className="advertisement-button">
              Follow Updates
            </button>

          </div>


          {/* DIGITAL PROMOTION */}
          <div className="advertisement-card">

            <div className="advertisement-card-icon">
              💻
            </div>

            <h3>Digital Promotion</h3>

            <p>
              Access digital promotional materials and event information
              shared through the departmental website and online platforms.
            </p>

            <button className="advertisement-button">
              Explore Events
            </button>

          </div>

        </div>

      </div>


      {/* FEATURED EVENT */}
      <div className="advertisement-featured">

        <div className="advertisement-featured-content">

          <span className="advertisement-badge">
            FEATURED EVENT
          </span>

          <h2>Upcoming Events</h2>

          <p>
            Keep an eye on this section for important upcoming events
            and promotional announcements from the department.
          </p>

          <button className="advertisement-primary-button">
            View All Events
          </button>

        </div>

        <div className="advertisement-featured-icon">
          🎉
        </div>

      </div>


      {/* PUBLICITY GUIDELINES */}
      <div className="advertisement-guidelines">

        <div className="advertisement-guidelines-icon">
          📋
        </div>

        <div>

          <h2>Publicity Guidelines</h2>

          <ul>
            <li>
              Check the official event information before registering.
            </li>

            <li>
              Refer only to authorized event announcements and posters.
            </li>

            <li>
              Check registration deadlines and venue information carefully.
            </li>

            <li>
              Follow official communication channels for schedule changes.
            </li>

            <li>
              Contact the event organizing team if you need clarification.
            </li>
          </ul>

        </div>

      </div>


      {/* CONTACT */}
      <div className="advertisement-contact">

        <div className="advertisement-contact-icon">
          📞
        </div>

        <div>

          <h2>Want to Know More?</h2>

          <p>
            For publicity, promotional, or event-related queries,
            please contact the organizing team.
          </p>

          <div className="advertisement-contact-details">

            <span>
              <strong>Email:</strong> events@nitt.edu
            </span>

            <span>
              <strong>Phone:</strong> +91-431-2504135
            </span>

          </div>

        </div>

      </div>

      </div>
    </UserLayout>
  );
};

export default AdvertisementPublicity;