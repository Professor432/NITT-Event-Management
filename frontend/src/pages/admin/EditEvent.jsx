import { useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";

import events from "../../data/events";


function EditEvent() {

  const { id } = useParams();

  const event = events.find(
    (event) => event.id === Number(id)
  );


  const [formData, setFormData] = useState({

    title: event?.title || "",
    description: event?.description || "",
    startDate: event?.startDate || "",
    endDate: event?.endDate || "",
    startTime: "",
    endTime: "",
    venue: event?.venue || "",
    capacity: event?.capacity || ""

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

    console.log("Updated event:", formData);

    alert(
      "Event updated successfully! Database connection will be added later."
    );

  };


  if (!event) {

    return (
      <div>
        <h1>Event not found</h1>
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

          <button className="back-button">
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


            <div className="form-row">

              <div className="form-field">

                <label>
                  Venue
                </label>

                <input
                  type="text"
                  name="venue"
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
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


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