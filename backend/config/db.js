const mongoose = require("mongoose");
const { Department, Venue } = require("../models/models");

const seedInitialData = async () => {
  await Department.updateOne(
    { code: "CSE" },
    { $setOnInsert: { name: "Computer Science and Engineering", code: "CSE" } },
    { upsert: true }
  );
  await Department.updateOne(
    { code: "ECE" },
    { $setOnInsert: { name: "Electronics and Communication Engineering", code: "ECE" } },
    { upsert: true }
  );
  await Venue.updateOne(
    { name: "Barn Hall" },
    { $setOnInsert: { name: "Barn Hall", location: "NIT Trichy", capacity: 1000 } },
    { upsert: true }
  );
  await Venue.updateOne(
    { name: "Third I Building" },
    { $setOnInsert: { name: "Third I Building", location: "NIT Trichy", capacity: 400 } },
    { upsert: true }
  );
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await seedInitialData();

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;