const express = require("express");
const router = express.Router();
const {
  askQuestion,
  getAllQuestions,
  getQuestionById,
} = require("../controllers/questionController");

const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, askQuestion); // ask a question
router.get("/", getAllQuestions); // get all questions
router.get("/:id", getQuestionById); // get question by ID

module.exports = router;
