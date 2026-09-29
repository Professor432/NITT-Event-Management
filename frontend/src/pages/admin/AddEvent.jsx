import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";

import { createEvent } from "../../api/eventApi";
import { getVenues } from "../../api/venueApi";
import { getDepartments } from "../../api/departmentApi";


function AddEvent() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    title: "",
    description: "",

    startDate: "",
    endDate: "",

    startTime: "",
    endTime: "",

    venue: "",
    department: "",

    category: "Technical",

    status: "upcoming"

  });


  const [venues, setVenues] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);


  // --------------------------------
  // Load departments and venues
  // --------------------------------

  useEffect(() => {

    const loadFormData = async () => {

      try {

        const [
          venuesData,
          departmentsData
        ] = await Promise.all([

          getVenues(),
          getDepartments()

        ]);

        setVenues(venuesData);
        setDepartments(departmentsData);


      } catch (error) {

        console.error(error);

        alert(
          "Failed to load departments and venues."
        );

      } finally {

        setLoadingData(false);

      }

    };

    loadFormData();

  }, []);


  // --------------------------------
  // Input change
  // --------------------------------

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // --------------------------------
  // Submit
  // --------------------------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);


      // Combine date + time
      const startDateTime =
        `${formData.startDate}T${formData.startTime}:00`;

      const endDateTime =
        `${formData.endDate}T${formData.endTime}:00`;


      const eventData = {

        title: formData.title,

        description:
          formData.description,

        category:
          formData.category,

        startDate:
          startDateTime,

        endDate:
          endDateTime,

        department:
          formData.department,

        venue:
          formData.venue,

        status:
          formData.status

      };


      console.log(
        "Sending event:",
        eventData
      );


      const newEvent =
        await createEvent(eventData);


      console.log(
        "Created event:",
        newEvent
      );


      alert(
        "Event created successfully!"
      );


      // Go back to Manage Events
      navigate("/admin/events");


    } catch (error) {

      console.error(error);

      alert(
        error.message ||
        "Failed to create event."
      );

    } finally {

      setLoading(false);

    }

  };


  // --------------------------------
  // Back
  // --------------------------------

  const handleBack = () => {
    navigate("/admin/events");
  };


  // --------------------------------
  // Loading
  // --------------------------------

  if (loadingData) {

    return (

      <div className="dashboard-layout">

        <Sidebar userType="admin" />

        <main className="main-content">

          <TopNavbar
            userName="Admin"
            role="Administrator"
          />

          <div className="dashboard-content">

            <h2>
              Loading form...
            </h2>

          </div>

        </main>

      </div>

    );

  }


  return (

    <div className="dashboard-layout">

      <Sidebar userType="admin" />

      <main className="main-content">

        <TopNavbar
          userName="Admin"
          role="Administrator"
        />


        <div className="dashboard-content">


          <button
            className="back-button"
            onClick={handleBack}
          >
            ← Back to Events
          </button>


          <div className="form-page-header">

            <h1>
              Create New Event
            </h1>

            <p>
              Add a new event to the department event calendar.
            </p>

          </div>


          <form
            className="event-form"
            onSubmit={handleSubmit}
          >


            {/* EVENT NAME */}

            <div className="form-field full-width">

              <label>
                Event Name
              </label>

              <input
                type="text"
                name="title"
                placeholder="Enter event name"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="form-field full-width">

              <label>
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe the event..."
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              />

            </div>


            {/* CATEGORY */}

            <div className="form-field">

              <label>
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >

                <option value="Technical">
                  Technical
                </option>

                <option value="Cultural">
                  Cultural
                </option>

                <option value="Academic">
                  Academic
                </option>

                <option value="Workshop">
                  Workshop
                </option>

                <option value="Seminar">
                  Seminar
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            {/* DEPARTMENT */}

            <div className="form-field">

              <label>
                Department
              </label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Department
                </option>

                {departments.map(
                  (department) => (

                    <option
                      key={department._id}
                      value={department._id}
                    >
                      {department.name}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* DATE */}

            <div className="form-row">

              <div className="form-field">

                <label>
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-field">

                <label>
                  End Date
                </label>

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* TIME */}

            <div className="form-row">

              <div className="form-field">

                <label>
                  Start Time
                </label>

                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-field">

                <label>
                  End Time
                </label>

                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* VENUE */}

            <div className="form-field full-width">

              <label>
                Venue
              </label>

              <select
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Venue
                </option>

                {venues.map(
                  (venue) => (

                    <option
                      key={venue._id}
                      value={venue._id}
                    >
                      {venue.name} — Capacity:{" "}
                      {venue.capacity}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={handleBack}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >

                {loading
                  ? "Creating..."
                  : "Create Event"
                }

              </button>

            </div>


          </form>

        </div>

      </main>

    </div>

  );

}

export default AddEvent;