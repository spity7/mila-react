require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db/connect"); // Reuse the connectDB function
const Property = require("./models/Property");
const { Properties } = require("../client/src/data/propertiesMila");

const seedData = async () => {
  try {
    // Connect to MongoDB using the existing connectDB function
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Property.deleteMany();
    console.log("Existing properties cleared");

    // Insert Properties data one by one
    for (const property of Properties) {
      await Property.create(property);
    }
    console.log("Properties data seeded successfully");

    // Close the connection
    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
