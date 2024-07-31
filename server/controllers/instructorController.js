const User = require("../models/User");

// Add a new instructor (Only accessible to admins)
exports.addInstructor = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Only allow admins to add instructors
    if (req.user.role !== "admin") {
      return res.status(403).send("Access denied");
    }

    const instructor = new User({
      fullName,
      email,
      password,
      role: "instructor",
    });
    await instructor.save();
    res.status(201).send({ message: "Instructor added", instructor });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all instructors (Accessible to all authenticated users)
exports.getInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" });
    res.send(instructors);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getInstructorsById = async (req, res) => {
  try {
    // Extract ID from URL parameter
    const id = req.params.instructorId;

    if (!id) {
      return res.status(400).send("ID parameter is required");
    }

    // Fetch the instructor by ID
    const instructor = await User.findOne({ _id: id, role: "instructor" });

    if (!instructor) {
      return res.status(404).send("Instructor not found");
    }

    // Send the instructor as a response
    res.send(instructor);
  } catch (error) {
    // Handle any errors that occurred during the query
    res.status(500).send(error.message);
  }
};

// Update instructor details (Only accessible to admins)
exports.updateInstructor = async (req, res) => {
  const id = req.params.instructorId;
  const updates = req.body;

  try {
    const instructor = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!instructor) return res.status(404).send("Instructor not found");
    res.send(instructor);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an instructor (Only accessible to admins)
exports.deleteInstructor = async (req, res) => {
  const id = req.params.instructorId;

  try {
    // Only allow admins to delete instructors
    if (req.user.role !== "admin") {
      return res.status(403).send("Access denied");
    }

    const instructor = await User.findByIdAndDelete(id);
    if (!instructor) return res.status(404).send("Instructor not found");
    res.send({ message: "Instructor deleted", instructor });
  } catch (error) {
    res.status(500).send(error);
  }
};
