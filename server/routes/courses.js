const express = require("express");
const router = express.Router();
const {
  addCourse,
  getCourses,
  updateCourses,
  deleteCourses,
  getCourseById,
} = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addCourse);
router.get("/", getCourses);
router.get("/:courseId", getCourseById);
router.put("/:courseId", authMiddleware, updateCourses);
router.delete("/:courseId", authMiddleware, deleteCourses);

module.exports = router;
