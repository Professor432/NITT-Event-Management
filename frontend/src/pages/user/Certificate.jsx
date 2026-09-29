import { useState } from "react";
import UserLayout from "../../layouts/UserLayout";

const Certificate = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Temporary event data
  // Later this can be replaced with data from your MongoDB API.
  const events = [
    {
      id: 1,
      name: "National Symposium 2026",
      date: "15 October 2026",
      venue: "Barn Hall",
      status: "Eligible",
    },
    {
      id: 2,
      name: "Technical Workshop on AI",
      date: "20 October 2026",
      venue: "Third I Building",
      status: "Eligible",
    },
  ];

  const generateCertificate = (event) => {
    setSelectedEvent(event);
    setShowCertificate(true);
  };

  const closeCertificate = () => {
    setShowCertificate(false);
  };

  const printCertificate = () => {
    window.print();
  };

  return (
    <UserLayout>
      <div className="certificate-page">

      {/* PAGE HEADER */}

      <div className="certificate-page-header">
        <div>
          <h1>Certificate Generation</h1>

          <p>
            Generate and download your participation certificates for
            registered events.
          </p>
        </div>
      </div>


      {/* INFORMATION */}

      <div className="certificate-info-box">

        <div className="certificate-info-icon">
          🏆
        </div>

        <div>
          <h2>Your Participation Certificates</h2>

          <p>
            Certificates are available for eligible events in which you
            have participated. Select an event below to generate your
            certificate.
          </p>
        </div>

      </div>


      {/* EVENT LIST */}

      <div className="certificate-events">

        <div className="certificate-section-header">
          <div>
            <h2>Eligible Events</h2>
            <p>
              Events for which your participation certificate is available.
            </p>
          </div>
        </div>


        <div className="certificate-event-list">

          {events.length === 0 ? (

            <div className="certificate-empty">
              <div className="certificate-empty-icon">
                📜
              </div>

              <h3>No Certificates Available</h3>

              <p>
                You currently do not have any eligible certificates.
              </p>
            </div>

          ) : (

            events.map((event) => (

              <div
                className="certificate-event-card"
                key={event.id}
              >

                <div className="certificate-event-icon">
                  🎓
                </div>


                <div className="certificate-event-details">

                  <h3>
                    {event.name}
                  </h3>

                  <div className="certificate-event-meta">

                    <span>
                      📅 {event.date}
                    </span>

                    <span>
                      📍 {event.venue}
                    </span>

                  </div>

                </div>


                <div className="certificate-event-action">

                  <span className="certificate-status">
                    {event.status}
                  </span>

                  <button
                    className="generate-certificate-button"
                    onClick={() => generateCertificate(event)}
                  >
                    Generate Certificate
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>


      {/* CERTIFICATE MODAL */}

      {showCertificate && selectedEvent && (

        <div className="certificate-modal-overlay">

          <div className="certificate-modal">

            {/* MODAL HEADER */}

            <div className="certificate-modal-header">

              <h2>Participation Certificate</h2>

              <button
                className="certificate-close-button"
                onClick={closeCertificate}
              >
                ×
              </button>

            </div>


            {/* ACTUAL CERTIFICATE */}

            <div
              className="certificate-print-area"
              id="certificate"
            >

              <div className="certificate-border">

                <div className="certificate-inner-border">

                  {/* INSTITUTION */}

                  <div className="certificate-institution">
                    NATIONAL INSTITUTE OF TECHNOLOGY
                  </div>

                  <div className="certificate-location">
                    TIRUCHIRAPPALLI
                  </div>

                  <div className="certificate-department">
                    DEPARTMENT EVENT MANAGEMENT
                  </div>


                  {/* ICON */}

                  <div className="certificate-emblem">
                    🏆
                  </div>


                  {/* TITLE */}

                  <h1 className="certificate-title">
                    CERTIFICATE
                  </h1>

                  <div className="certificate-subtitle">
                    OF PARTICIPATION
                  </div>


                  {/* CONTENT */}

                  <p className="certificate-presented">
                    This certificate is proudly presented to
                  </p>


                  {/* USER NAME */}

                  <h2 className="certificate-user-name">
                    User Name
                  </h2>


                  <div className="certificate-name-line"></div>


                  {/* EVENT */}

                  <p className="certificate-description">
                    for successfully participating in
                  </p>

                  <h2 className="certificate-event-name">
                    {selectedEvent.name}
                  </h2>


                  <p className="certificate-description">
                    held on{" "}
                    <strong>{selectedEvent.date}</strong>
                    {" "}at{" "}
                    <strong>{selectedEvent.venue}</strong>.
                  </p>


                  {/* FOOTER */}

                  <div className="certificate-footer">

                    <div className="certificate-footer-item">

                      <div className="certificate-line"></div>

                      <span>
                        Event Coordinator
                      </span>

                    </div>


                    <div className="certificate-id">

                      <span>
                        Certificate ID
                      </span>

                      <strong>
                        NITT-{selectedEvent.id}-2026
                      </strong>

                    </div>


                    <div className="certificate-footer-item">

                      <div className="certificate-line"></div>

                      <span>
                        Head of Department
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* MODAL ACTIONS */}

            <div className="certificate-modal-actions">

              <button
                className="certificate-cancel-button"
                onClick={closeCertificate}
              >
                Close
              </button>

              <button
                className="certificate-download-button"
                onClick={printCertificate}
              >
                🖨️ Download / Print Certificate
              </button>

            </div>

          </div>

        </div>

      )}

      </div>
    </UserLayout>
  );
};

export default Certificate;