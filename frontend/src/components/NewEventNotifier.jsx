import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getEvents } from "../api/eventApi";

function NewEventNotifier() {
  const { pathname } = useLocation();
  const isUserPage = pathname.startsWith("/user/");
  const knownEventIds = useRef(null);
  const [newEvents, setNewEvents] = useState([]);

  useEffect(() => {
    if (!isUserPage) {
      knownEventIds.current = null;
      return undefined;
    }

    let isActive = true;

    const checkForEvents = async () => {
      try {
        const events = await getEvents();
        if (!isActive) return;

        const currentIds = new Set(events.map((event) => event._id));
        if (knownEventIds.current === null) {
          knownEventIds.current = currentIds;
          setNewEvents([]);
          return;
        }

        const addedEvents = events.filter(
          (event) => !knownEventIds.current.has(event._id)
        );
        knownEventIds.current = currentIds;

        if (addedEvents.length > 0) {
          setNewEvents((previousEvents) => {
            const existingIds = new Set(previousEvents.map((event) => event._id));
            return [
              ...previousEvents,
              ...addedEvents.filter((event) => !existingIds.has(event._id)),
            ];
          });
        }
      } catch {
        // Keep the existing page usable if event polling is temporarily unavailable.
      }
    };

    checkForEvents();
    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") checkForEvents();
    }, 15000);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, [isUserPage]);

  if (!isUserPage || newEvents.length === 0) return null;

  return (
    <div className="new-event-notifications" aria-live="polite">
      {newEvents.map((event) => (
        <section className="new-event-notice" key={event._id}>
          <div className="new-event-notice-copy">
            <span className="new-event-notice-label">New event added</span>
            <strong>{event.title || event.name || "Department event"}</strong>
            <span>Refresh to see the latest event list.</span>
          </div>
          <div className="new-event-notice-actions">
            <button
              className="new-event-refresh"
              type="button"
              onClick={() => window.location.reload()}
            >
              Refresh page
            </button>
            <button
              className="new-event-dismiss"
              type="button"
              aria-label={`Dismiss notification for ${event.title || event.name || "new event"}`}
              onClick={() => {
                setNewEvents((previousEvents) =>
                  previousEvents.filter((item) => item._id !== event._id)
                );
              }}
            >
              ×
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}

export default NewEventNotifier;