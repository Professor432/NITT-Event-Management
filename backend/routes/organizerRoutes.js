const express = require("express");

const router = express.Router();

const {
    getOrganizers,
    createOrganizer
} = require("../controllers/organizerController");

router.get("/", getOrganizers);
router.post("/", createOrganizer);

module.exports = router;