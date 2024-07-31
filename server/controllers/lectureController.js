const Lecture = require("../models/Lecture");
const Course = require("../models/Course");
const User = require("../models/User");

// Add a lecture
exports.addLecture = async (req, res) => {
  try {
    const lecture = new Lecture(req.body);
    await lecture.save();
    res.status(201).send(lecture);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all lectures
exports.getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate("course")
      .populate("instructor");
    res.status(200).send(lectures);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get lecture by ID
exports.getLecturesByInstructorId = async (req, res) => {
  try {
    const instructorId = req.params.id; // Get instructor ID from request parameters

    // Fetch lectures from the database where the instructor ID matches
    const lectures = await Lecture.find({ instructorId: instructorId });

    if (!lectures || lectures.length === 0) {
      return res
        .status(404)
        .json({ message: "No lectures found for this instructor." });
    }

    // Return the list of lectures
    res.status(200).json(lectures);
  } catch (err) {
    console.error("Error fetching lectures:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a lecture by ID
exports.updateLecture = async (req, res) => {
  const lectureId = req.params.lectureId;
  const { courseId, instructorId, date } = req.body;

  console.log("Updating lecture with ID:", lectureId);
  console.log("Updates received:", req.body);

  try {
    // Validate courseId and instructorId
    if (courseId) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(400).send({ message: "Invalid course ID" });
      }
    }

    if (instructorId) {
      const instructor = await User.findById(instructorId);
      if (!instructor) {
        return res.status(400).send({ message: "Invalid instructor ID" });
      }
    }

    // Update the lecture
    const lecture = await Lecture.findByIdAndUpdate(
      lectureId,
      { $set: { course: courseId, instructor: instructorId, date } }, // Ensure only specific fields are updated
      { new: true, runValidators: true }
    )
      .populate("course")
      .populate("instructor");

    if (!lecture) {
      return res.status(404).send("Lecture not found");
    }

    res.status(200).send(lecture);
  } catch (error) {
    console.error("Error updating lecture:", error); // Log detailed error
    res
      .status(400)
      .send({ message: "Failed to update lecture", error: error.message });
  }
};
// Delete a lecture by ID
exports.deleteLecture = async (req, res) => {
  const lectureId = req.params.lectureId;

  console.log("Attempting to delete lecture with ID:", lectureId);

  try {
    // Check if the lecture exists before trying to delete
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).send({ message: "Lecture not found" });
    }

    // Proceed to delete the lecture
    const result = await Lecture.deleteOne({ _id: lectureId });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .send({ message: "Lecture not found or already deleted" });
    }

    res.status(200).send({ message: "Lecture deleted successfully" });
  } catch (error) {
    console.error("Error deleting lecture:", error); // Log detailed error
    res
      .status(500)
      .send({ message: "Failed to delete lecture", error: error.message });
  }
};
