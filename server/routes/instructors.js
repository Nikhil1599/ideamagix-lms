const express = require("express");
const router = express.Router();
const {
  addInstructor,
  getInstructors,
  updateInstructor,
  getInstructorsById,
  deleteInstructor,
} = require("../controllers/instructorController");
const authMiddleware = require("../middleware/authMiddleware");

// Add a new instructor
router.post("/", authMiddleware, addInstructor);

// Get all instructors
router.get("/", authMiddleware, getInstructors);

// Get all instructors
router.get("/:instructorId", authMiddleware, getInstructorsById);

// Update an instructor
router.put("/:instructorId", authMiddleware, updateInstructor);

// Delete an instructor
router.delete("/:instructorId", authMiddleware, deleteInstructor);

module.exports = router;
