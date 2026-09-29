const express = require("express");

const router = express.Router();

const {
    getRegistrations,
    getEventRegistrations,
    getRegistrationStatus,
    getRegisteredEventIds,
    createRegistration,
    deleteRegistration
} = require("../controllers/registrationController");

router.get("/", getRegistrations);
router.get("/registered-events", getRegisteredEventIds);
router.get("/event/:eventId/status", getRegistrationStatus);
router.get("/event/:eventId", getEventRegistrations);
router.post("/", createRegistration);
router.delete("/:id", deleteRegistration);

module.exports = router;