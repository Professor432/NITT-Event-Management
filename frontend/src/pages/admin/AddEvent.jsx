import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";

function AddEvent() {

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


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("New event:", formData);

    alert(
      "Event created successfully! Database connection will be added later."
    );

  };


  return (

    <div className="dashboard-layout">

      <Sidebar userType="admin" />

      <main className="main-content">

        <TopNavbar
          userName="Admin"
          role="Administrator"
        />

        <div className="dashboard-content">

          <button className="back-button">
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


            {/* VENUE + CAPACITY */}

            <div className="form-row">

              <div className="form-field">

                <label>
                  Venue
                </label>

                <input
                  type="text"
                  name="venue"
                  placeholder="e.g. Seminar Hall"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-field">

                <label>
                  Maximum Participants
                </label>

                <input
                  type="number"
                  name="capacity"
                  placeholder="e.g. 100"
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
              >
                Cancel
              </button>

              <button
                type="submit"
                className="submit-button"
              >
                Create Event
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default AddEvent;