const Course = require("../models/Course");

// Add a course
exports.addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    if (!courseId) {
      return res.status(400).send("Course ID is required");
    }

    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send("Course not found");
    }

    res.status(200).send(course);
  } catch (error) {
    // Handle any errors that occurred during the query
    res.status(500).send(error.message);
  }
};

// Update a course by ID
exports.updateCourses = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const updates = req.body;

    // Find and update the course by ID
    const course = await Course.findByIdAndUpdate(courseId, updates, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).send("Course not found");
    }

    res.status(200).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a course by ID
exports.deleteCourses = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Find and delete the course by ID
    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).send("Course not found");
    }

    res.status(200).send("Course deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};
