const express = require("express");
const router = express.Router();
const {
  addLecture,
  getLectures,
  updateLecture,
  deleteLecture,
  getLecturesByInstructorId,
} = require("../controllers/lectureController");

// Route to add a new lecture
router.post("/", addLecture);

// Route to get all lectures
router.get("/", getLectures);

// Route to get lectures by instructor ID
router.get("/:instructorId", getLecturesByInstructorId);

// Route to update a specific lecture by ID
router.put("/:lectureId", updateLecture);

// Route to delete a specific lecture by ID
router.delete("/:lectureId", deleteLecture);

module.exports = router;
