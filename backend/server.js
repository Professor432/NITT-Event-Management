const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// =======================
// Middleware
// =======================

app.use(cors());
app.use(express.json());

// =======================
// MongoDB Connection
// =======================

connectDB();

// =======================
// Routes
// =======================

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/venues", require("./routes/venueRoutes"));
app.use("/api/registrations", require("./routes/registrationRoutes"));
app.use("/api/organizers", require("./routes/organizerRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));

// =======================
// Test Route
// =======================

app.get("/", (req, res) => {
    res.json({
        message: "NITT Event Management API is running"
    });
});

// =======================
// Server
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});