const API_URL = "http://localhost:5000/api/registrations";

export const createRegistration = async (registration) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registration)
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to register for this event");
  }

  return data;
};

export const getEventRegistrations = async (eventId) => {
  const response = await fetch(`${API_URL}/event/${eventId}`);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to load registrations");
  }

  return data;
};

export const getRegistrationStatus = async (eventId, email) => {
  const response = await fetch(
    `${API_URL}/event/${eventId}/status?email=${encodeURIComponent(email)}`
  );
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to check registration status");
  }

  return data;
};

export const getRegisteredEventIds = async (email) => {
  const response = await fetch(
    `${API_URL}/registered-events?email=${encodeURIComponent(email)}`
  );
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to load registered events");
  }

  return data;
};