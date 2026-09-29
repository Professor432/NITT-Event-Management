const { EventOrganizer } = require("../models/models");

const getOrganizers = async (req, res) => {
    try {
        const organizers = await EventOrganizer.find();

        res.status(200).json(organizers);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch organizers",
            error: error.message
        });
    }
};


const createOrganizer = async (req, res) => {
    try {
        const organizer = await EventOrganizer.create(req.body);

        res.status(201).json(organizer);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create organizer",
            error: error.message
        });
    }
};


module.exports = {
    getOrganizers,
    createOrganizer
};