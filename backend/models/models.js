const mongoose = require("mongoose");

const { Schema } = mongoose;

// ======================================================
// USER
// ======================================================

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["student", "faculty", "admin"],
            default: "student"
        },

        department: {
            type: Schema.Types.ObjectId,
            ref: "Department"
        }
    },
    {
        timestamps: true
    }
);


// ======================================================
// DEPARTMENT
// ======================================================

const departmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true
        },

        description: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);


// ======================================================
// VENUE
// ======================================================

const venueSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        capacity: {
            type: Number,
            required: true,
            min: 1
        },

        description: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);


// ======================================================
// EVENT
// ======================================================

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        category: {
            type: String,
            default: "General"
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        department: {
            type: Schema.Types.ObjectId,
            ref: "Department",
            required: true
        },

        venue: {
            type: Schema.Types.ObjectId,
            ref: "Venue",
            required: true
        },

        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed", "cancelled"],
            default: "upcoming"
        }
    },
    {
        timestamps: true
    }
);


// ======================================================
// REGISTRATION
// ======================================================

const registrationSchema = new Schema(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

        studentName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        department: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        notes: {
            type: String,
            trim: true,
            default: ""
        },

        registrationDate: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: ["registered", "cancelled"],
            default: "registered"
        }
    },
    {
        timestamps: true
    }
);

registrationSchema.index(
    { event: 1, email: 1 },
    {
        unique: true,
        partialFilterExpression: { email: { $type: "string" } }
    }
);


// ======================================================
// EVENT ORGANIZER
// ======================================================

const eventOrganizerSchema = new Schema(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        organizerRole: {
            type: String,
            default: "Organizer"
        }
    },
    {
        timestamps: true
    }
);


// ======================================================
// ANNOUNCEMENT
// ======================================================

const announcementSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        message: {
            type: String,
            required: true
        },

        event: {
            type: Schema.Types.ObjectId,
            ref: "Event"
        },

        publishedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        publishedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);


// ======================================================
// CREATE MODELS
// ======================================================

const User = mongoose.model("User", userSchema);

const Department = mongoose.model(
    "Department",
    departmentSchema
);

const Venue = mongoose.model(
    "Venue",
    venueSchema
);

const Event = mongoose.model(
    "Event",
    eventSchema
);

const Registration = mongoose.model(
    "Registration",
    registrationSchema
);

const EventOrganizer = mongoose.model(
    "EventOrganizer",
    eventOrganizerSchema
);

const Announcement = mongoose.model(
    "Announcement",
    announcementSchema
);


// ======================================================
// EXPORT MODELS
// ======================================================

module.exports = {
    User,
    Department,
    Venue,
    Event,
    Registration,
    EventOrganizer,
    Announcement
};