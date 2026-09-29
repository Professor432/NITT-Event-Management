const { Event, Registration } = require("../models/models");

const getRegistrations = async (req, res) => {
    try {
        const query = req.params.eventId
            ? { event: req.params.eventId, status: "registered" }
            : {};
        const registrations = await Registration.find(query)
            .populate("event", "title startDate endDate")
            .sort({ registrationDate: -1 });

        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch registrations",
            error: error.message
        });
    }
};

const getRegistrationStatus = async (req, res) => {
    try {
        const email = req.query.email?.trim().toLowerCase();

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const registration = await Registration.findOne({
            event: req.params.eventId,
            email,
            status: "registered"
        }).select("_id");

        res.status(200).json({ registered: Boolean(registration) });
    } catch (error) {
        res.status(500).json({
            message: "Failed to check registration status",
            error: error.message
        });
    }
};


const getRegisteredEventIds = async (req, res) => {
    try {
        const email = req.query.email?.trim().toLowerCase();

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const registrations = await Registration.find({ email, status: "registered" })
            .select("event");

        res.status(200).json(registrations.map((registration) => registration.event.toString()));
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch registered events",
            error: error.message
        });
    }
};


const createRegistration = async (req, res) => {
    try {
        const { event, studentName, email, department, phone, notes } = req.body;
        const eventRecord = await Event.findById(event);

        if (!eventRecord) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (eventRecord.status === "cancelled" || eventRecord.endDate < new Date()) {
            return res.status(400).json({ message: "Registration is closed for this event" });
        }

        const registration = await Registration.create({
            event,
            studentName,
            email,
            department,
            phone,
            notes
        });

        res.status(201).json(registration);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "This email is already registered for the event" });
        }

        res.status(400).json({
            message: "Failed to create registration",
            error: error.message
        });
    }
};


const deleteRegistration = async (req, res) => {
    try {
        const registration =
            await Registration.findByIdAndDelete(req.params.id);

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        res.status(200).json({
            message: "Registration deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete registration",
            error: error.message
        });
    }
};


module.exports = {
    getRegistrations,
    getEventRegistrations: getRegistrations,
    getRegistrationStatus,
    getRegisteredEventIds,
    createRegistration,
    deleteRegistration
};