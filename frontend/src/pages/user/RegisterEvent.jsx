import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import { getEventById } from "../../api/eventApi";
import { getDepartments } from "../../api/departmentApi";
import { createRegistration, getRegistrationStatus } from "../../api/registrationApi";

function RegisterEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [checkingRegistration, setCheckingRegistration] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(() => {
    try {
      return {
        studentName: "",
        email: "",
        department: "",
        phone: "",
        notes: "",
        ...JSON.parse(localStorage.getItem("studentRegistrationProfile") || "{}")
      };
    } catch {
      return { studentName: "", email: "", department: "", phone: "", notes: "" };
    }
  });

  useEffect(() => {
    Promise.all([getEventById(id), getDepartments()])
      .then(([eventData, departmentData]) => {
        setEvent(eventData);
        setDepartments(departmentData);
        setForm((current) => ({
          ...current,
          department: departmentData.some((department) => department.name === current.department)
            ? current.department
            : ""
        }));
      })
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (eventChange) => {
    setForm((current) => ({ ...current, [eventChange.target.name]: eventChange.target.value }));
    if (eventChange.target.name === "email") {
      setAlreadyRegistered(false);
    }
  };

  const checkRegistration = async (email) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) return;

    setCheckingRegistration(true);
    setError("");
    try {
      const result = await getRegistrationStatus(id, normalizedEmail);
      setAlreadyRegistered(result.registered);
    } catch (checkError) {
      setError(checkError.message);
    } finally {
      setCheckingRegistration(false);
    }
  };

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const status = await getRegistrationStatus(id, form.email);
      if (status.registered) {
        setAlreadyRegistered(true);
        return;
      }
      await createRegistration({ ...form, event: id });
      localStorage.setItem("studentRegistrationProfile", JSON.stringify({
        studentName: form.studentName,
        email: form.email.trim().toLowerCase(),
        department: form.department,
        phone: form.phone
      }));
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar userType="user" />
      <main className="main-content">
        <TopNavbar userName="John Doe" role="Student" />
        <div className="dashboard-content">
          <button className="back-button" onClick={() => navigate(`/user/events/${id}`)}>
            Back to event
          </button>
          <section className="registration-page">
            <h1>Event registration</h1>
            {loading ? <p role="status">Loading event...</p> : event && (
              <>
                <p className="registration-event-title">{event.title}</p>
                <p className="registration-event-date">
                  {new Date(event.startDate).toLocaleString("en-IN", {
                    dateStyle: "medium", timeStyle: "short"
                  })}
                </p>
                {submitted ? (
                  <div className="registration-success" role="status">
                    <h2>Registration confirmed</h2>
                    <p>You are registered for {event.title}.</p>
                    <button className="view-button" onClick={() => navigate(`/user/events/${id}`)}>
                      Return to event
                    </button>
                  </div>
                ) : alreadyRegistered ? (
                  <div className="registration-success" role="status">
                    <h2>Already registered</h2>
                    <p>This email is already registered for this event.</p>
                    <button className="view-button" onClick={() => navigate(`/user/events/${id}`)}>
                      Return to event
                    </button>
                  </div>
                ) : (
                  <>
                    {error && <p className="registration-error" role="alert">{error}</p>}
                    <form className="registration-form" onSubmit={handleSubmit}>
                  <label>
                    Full name
                    <input name="studentName" value={form.studentName} onChange={handleChange} required maxLength="100" autoComplete="name" />
                  </label>
                  <label>
                    Email address
                    <input name="email" type="email" value={form.email} onChange={handleChange} onBlur={(eventChange) => checkRegistration(eventChange.target.value)} required maxLength="254" autoComplete="email" />
                    {checkingRegistration && <small>Checking registration...</small>}
                  </label>
                  <label>
                    Department
                    <select name="department" value={form.department} onChange={handleChange} required>
                      <option value="">Select your department</option>
                      {departments.map((department) => (
                        <option key={department._id} value={department.name}>{department.name} ({department.code})</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Phone number
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} required minLength="7" maxLength="20" pattern="[0-9+() -]{7,20}" autoComplete="tel" />
                  </label>
                  <label className="registration-notes">
                    Note for organizers <span>(optional)</span>
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows="3" maxLength="500" />
                  </label>
                  <button className="register-button" type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Confirm registration"}
                  </button>
                    </form>
                  </>
                )}
              </>
            )}
            {!loading && !event && <p className="registration-error" role="alert">{error || "Event not found."}</p>}
          </section>
        </div>
      </main>
    </div>
  );
}

export default RegisterEvent;