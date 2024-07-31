const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const cors = require("cors");
const instructorRoutes = require("./routes/instructors");
const lectureRoutes = require("./routes/lectures");
require("dotenv").config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

app.use(express.json());
const corsOptions = { origin: true };
app.use(cors(corsOptions));

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/lectures", lectureRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
