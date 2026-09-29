const { Venue } = require("../models/models");

const getVenues = async (req, res) => {
    try {
        const venues = await Venue.find();

        res.status(200).json(venues);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch venues",
            error: error.message
        });
    }
};


const getVenueById = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);

        if (!venue) {
            return res.status(404).json({
                message: "Venue not found"
            });
        }

        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch venue",
            error: error.message
        });
    }
};


const createVenue = async (req, res) => {
    try {
        const venue = await Venue.create(req.body);

        res.status(201).json(venue);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create venue",
            error: error.message
        });
    }
};


module.exports = {
    getVenues,
    getVenueById,
    createVenue
};