const Answer = require("../models/Answer");

exports.postAnswer = async (req, res) => {
  try {
    const { content } = req.body;
    const answer = new Answer({
      content,
      question: req.params.questionId,
      user: req.user.id,
    });
    await answer.save();
    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ error: "Failed to post answer" });
  }
};

exports.getAnswersByQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId })
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch answers" });
  }
};
