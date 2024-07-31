const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env

const secret = process.env.JWT_SECRET;

// Signup
exports.signup = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const user = new User({ fullName, email, password, role });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while creating the user", error });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.fullName },
      secret,
      { expiresIn: "30d" } // Set expiration to 1 month
    );

    res.json({ token, user: user });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during login", error });
    console.log(error);
  }
};
