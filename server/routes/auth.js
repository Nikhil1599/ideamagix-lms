const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

router.post("/admin/signup", signup);
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
