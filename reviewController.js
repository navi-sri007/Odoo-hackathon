const Review = require("../models/Review");

exports.leaveReview = async (req, res) => {
  try {
    const { reviewedUser, rating, comment } = req.body;

    if (reviewedUser === req.user.id) {
      return res.status(400).json({ error: "You cannot review yourself." });
    }

    const newReview = new Review({
      reviewer: req.user.id,
      reviewedUser,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: "Review submitted", review: newReview });
  } catch (err) {
    res.status(500).json({ error: "Error submitting review" });
  }
};

exports.getReviewsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.find({ reviewedUser: userId }).populate(
      "reviewer",
      "username"
    );

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
};
