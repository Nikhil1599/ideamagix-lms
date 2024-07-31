const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the schema for users
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "instructor"], // Enum for user roles
    required: true,
    default: "admin",
  },
  //lectures that only exists if the role is "instructor"
  lectures: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
    default: [],
  },
});

userSchema.virtual("isInstructor").get(function () {
  return this.role === "instructor";
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

// Pre-save middleware to hash passwords
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to check password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Export the User model
module.exports = mongoose.model("User", userSchema);
