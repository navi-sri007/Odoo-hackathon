const Question = require("../models/Question");

exports.askQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const question = new Question({
      title,
      description,
      tags,
      user: req.user.id,
    });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: "Failed to ask question" });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      "user",
      "username"
    );
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch question" });
  }
};
