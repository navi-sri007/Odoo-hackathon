const Profile = require("../models/Profile");

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user: req.user.id,
    };

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      data,
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to save profile" });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Error fetching profile" });
  }
};

exports.searchBySkill = async (req, res) => {
  try {
    const { skill } = req.query;
    const results = await Profile.find({
      isPublic: true,
      skillsOffered: { $regex: skill, $options: "i" },
    }).populate("user", "username");

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
};
