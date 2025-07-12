const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🛠️ Middlewares
app.use(cors());
app.use(express.json()); // ✅ Important: enables reading JSON body from requests

const profileRoutes = require("./routes/profile");
app.use("/api/profile", profileRoutes);

// 🛣️ Route imports
const authRoutes = require("./routes/auth");

// 🛣️ Route usage
app.use("/api/auth", authRoutes);
// 🌐 Test root route
app.get("/", (req, res) => {
  res.send("Skill Swap backend is running");
});
const reviewRoutes = require("./routes/review");
app.use("/api/reviews", reviewRoutes);

// 🔧 MongoDB connection and server start
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));
