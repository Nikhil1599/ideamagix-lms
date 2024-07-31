const mongoose = require("mongoose");

// Define the schema for courses
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  lectures: [
    {
      date: { type: Date, required: true },
      instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
});

// Export the Course model
module.exports = mongoose.model("Course", courseSchema);
