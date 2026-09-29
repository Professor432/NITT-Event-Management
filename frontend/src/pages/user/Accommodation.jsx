import UserLayout from "../../layouts/UserLayout";

const Accommodation = () => {
  return (
    <UserLayout>
      <div className="accommodation-page">

      {/* PAGE HEADER */}
      <div className="accommodation-header">
        <h1>Accommodation & Hospitality</h1>
        <p>
          Information about accommodation, food, hospitality services,
          and facilities available for event participants.
        </p>
      </div>

      {/* WELCOME SECTION */}
      <div className="accommodation-welcome">
        <div className="welcome-icon">🏨</div>

        <div>
          <h2>Welcome to NIT Trichy</h2>

          <p>
            Accommodation and hospitality information for participants
            attending departmental events at the National Institute of
            Technology, Tiruchirappalli.
          </p>
        </div>
      </div>

      {/* INFORMATION CARDS */}
      <div className="accommodation-grid">

        {/* ACCOMMODATION */}
        <div className="accommodation-card">
          <div className="card-icon">🛏️</div>

          <h3>Accommodation Facilities</h3>

          <p>
            Accommodation facilities may be provided to eligible
            participants depending on the event and availability.
          </p>

          <ul>
            <li>Accommodation is subject to availability.</li>
            <li>Participants should carry valid ID proof.</li>
            <li>Follow all accommodation rules and regulations.</li>
            <li>Maintain cleanliness in the accommodation area.</li>
          </ul>
        </div>

        {/* CHECK-IN / CHECK-OUT */}
        <div className="accommodation-card">
          <div className="card-icon">🕐</div>

          <h3>Check-in & Check-out</h3>

          <p>
            Participants should follow the check-in and check-out
            timings communicated by the event organizers.
          </p>

          <ul>
            <li>Carry your event registration details.</li>
            <li>Complete the required check-in procedure.</li>
            <li>Follow instructions from the hospitality team.</li>
            <li>Check out within the allotted time.</li>
          </ul>
        </div>

        {/* FOOD */}
        <div className="accommodation-card">
          <div className="card-icon">🍽️</div>

          <h3>Food & Hospitality</h3>

          <p>
            Food and hospitality arrangements may be provided depending
            on the requirements of the event.
          </p>

          <ul>
            <li>Meal timings will be communicated by organizers.</li>
            <li>Refreshments may be provided during the event.</li>
            <li>Follow the designated dining arrangements.</li>
            <li>Inform organizers about special requirements in advance.</li>
          </ul>
        </div>

        {/* GUIDELINES */}
        <div className="accommodation-card">
          <div className="card-icon">📋</div>

          <h3>Important Guidelines</h3>

          <p>
            Participants are requested to follow all campus,
            accommodation, and event guidelines during their stay.
          </p>

          <ul>
            <li>Carry your college/institution ID card.</li>
            <li>Maintain cleanliness and discipline.</li>
            <li>Respect campus property and facilities.</li>
            <li>Follow instructions from event coordinators.</li>
          </ul>
        </div>

      </div>

      {/* CONTACT SECTION */}
      <div className="accommodation-contact">

        <div className="contact-icon">📞</div>

        <div>
          <h2>Need Help?</h2>

          <p>
            For accommodation or hospitality-related queries,
            please contact the event organizing team.
          </p>

          <div className="contact-details">
            <span>
              <strong>Email:</strong> hospitality@nitt.edu
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

export default Accommodation;