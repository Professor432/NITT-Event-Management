const { Announcement } = require("../models/models");

const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();

        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch announcements",
            error: error.message
        });
    }
};


const createAnnouncement = async (req, res) => {
    try {
        const announcement =
            await Announcement.create(req.body);

        res.status(201).json(announcement);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create announcement",
            error: error.message
        });
    }
};


module.exports = {
    getAnnouncements,
    createAnnouncement
};