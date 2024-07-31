const mongoose = require("mongoose");

// Define the schema for lectures
const lectureSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, required: true },
});

// Export the Lecture model
module.exports = mongoose.model("Lecture", lectureSchema);
