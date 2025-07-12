const express = require("express");
const router = express.Router();
const {
  createOrUpdateProfile,
  getMyProfile,
  searchBySkill,
} = require("../controllers/profileController");
const { verifyToken } = require("../middleware/auth");

// ✅ Upload setup
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });

// ✅ Create or update profile (must be authenticated)
router.post("/", verifyToken, createOrUpdateProfile);

// ✅ Get your profile
router.get("/me", verifyToken, getMyProfile);

// ✅ Search by skill
router.get("/search", searchBySkill);

// ✅ Upload profile picture
router.post(
  "/upload",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const imageUrl = req.file.path;

      const profile = await require("../models/Profile").findOneAndUpdate(
        { user: req.user.id },
        { image: imageUrl },
        { new: true, upsert: true }
      );

      res.json({ message: "Profile picture updated", profile });
    } catch (err) {
      res.status(500).json({ error: "Image upload failed" });
    }
  }
);

// ✅ Test route
router.get("/test", (req, res) => {
  res.send("✅ Profile route is working");
});

module.exports = router;
