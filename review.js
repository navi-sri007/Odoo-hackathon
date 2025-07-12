const express = require("express");
const router = express.Router();
const {
  leaveReview,
  getReviewsForUser,
} = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, leaveReview);
router.get("/:userId", getReviewsForUser);

module.exports = router;
