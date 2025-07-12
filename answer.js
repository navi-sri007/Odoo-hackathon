const express = require("express");
const router = express.Router();
const {
  postAnswer,
  getAnswersByQuestion,
} = require("../controllers/answerController");

const { verifyToken } = require("../middleware/auth");

router.post("/:questionId", verifyToken, postAnswer);
router.get("/:questionId", getAnswersByQuestion);

module.exports = router;
