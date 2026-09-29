import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";

import { getEventById, updateEvent } from "../../api/eventApi";


function EditEvent() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    capacity: ""
  });

  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState([]);

  // ============================
  // GET EVENT FROM DATABASE
  // ============================

  useEffect(() => {

    const fetchData = async () => {

      try {

        // Get event
        const event = await getEventById(id);

        // Get venues
        const venuesResponse = await fetch(
          "http://localhost:5000/api/venues"
        );

        if (!venuesResponse.ok) {
          throw new Error("Failed to fetch venues");
        }

        const venuesData = await venuesResponse.json();

        setVenues(venuesData);


        // Populate form
        setFormData({

          title: event.title || "",

          description: event.description || "",

          startDate: event.startDate
            ? event.startDate.substring(0, 10)
            : "",

          endDate: event.endDate
            ? event.endDate.substring(0, 10)
            : "",

          startTime: event.startDate
            ? new Date(event.startDate)
                .toISOString()
                .substring(11, 16)
            : "",

          endTime: event.endDate
            ? new Date(event.endDate)
                .toISOString()
                .substring(11, 16)
            : "",

          // If populate("venue") is used
          venue:
            typeof event.venue === "object"
              ? event.venue._id
              : event.venue || "",

          capacity: event.capacity || ""

        });

      } catch (error) {

        console.error("Error loading edit page:", error);

        alert(error.message || "Failed to load event.");

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, [id]);


  // ============================
  // HANDLE FORM CHANGES
  // ============================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));

  };


  // ============================
  // UPDATE EVENT
  // ============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // Combine date + time
      const startDateTime = new Date(
        `${formData.startDate}T${formData.startTime || "00:00"}`
      );

      const endDateTime = new Date(
        `${formData.endDate}T${formData.endTime || "00:00"}`
      );


      const updatedData = {

        title: formData.title,

        description: formData.description,

        startDate: startDateTime.toISOString(),

        endDate: endDateTime.toISOString(),

        venue: formData.venue,

        capacity: Number(formData.capacity)

      };


      console.log("Updating event:", updatedData);


      await updateEvent(id, updatedData);


      alert("Event updated successfully!");


      // Go to Event Details page
      navigate(`/admin/events/${id}`);

    } catch (error) {

      console.error("Update error:", error);

      alert(
        error.message || "Failed to update event."
      );

    }

  };


  // ============================
  // LOADING
  // ============================

  if (loading) {

    return (

      <div className="dashboard-layout">

        <Sidebar userType="admin" />

        <main className="main-content">

          <TopNavbar
            userName="Admin"
            role="Administrator"
          />

          <div className="dashboard-content">

            <h1>Loading event...</h1>

          </div>

        </main>

      </div>

    );

  }


  // ============================
  // EDIT PAGE
  // ============================

  return (

    <div className="dashboard-layout">

      <Sidebar userType="admin" />

      <main className="main-content">

        <TopNavbar
          userName="Admin"
          role="Administrator"
        />

        <div className="dashboard-content">


          {/* BACK BUTTON */}

          <button
            className="back-button"
            onClick={() => navigate("/admin/events")}
          >
            ← Back to Events
          </button>


          <div className="form-page-header">

            <h1>
              Edit Event
            </h1>

            <p>
              Update the event information below.
            </p>

          </div>


          <form
            className="event-form"
            onSubmit={handleSubmit}
          >


            {/* EVENT NAME */}

            <div className="form-field">

              <label>
                Event Name
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="form-field">

              <label>
                Description
              </label>

              <textarea
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              />

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
                />

              </div>

            </div>


            {/* VENUE + CAPACITY */}

            <div className="form-row">

              <div className="form-field">

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

                  {venues.map((venue) => (

                    <option
                      key={venue._id}
                      value={venue._id}
                    >
                      {venue.name}
                    </option>

                  ))}

                </select>

              </div>

              <div className="form-field">

                <label>
                  Maximum Participants
                </label>

                <input
                  type="number"
                  name="capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* BUTTONS */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate("/admin/events")}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="submit-button"
              >
                Save Changes
              </button>

            </div>


          </form>

        </div>

      </main>

    </div>

  );

}


export default EditEvent;