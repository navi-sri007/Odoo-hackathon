const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    bio: String,
    skillsOffered: [String],
    skillsWanted: [String],
    isAvailable: { type: Boolean, default: true },
    isPublic: { type: Boolean, default: true },
    image: String, // ✅ New: profile picture URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
