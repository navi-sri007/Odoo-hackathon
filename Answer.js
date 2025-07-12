const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  isAccepted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Answer", answerSchema);
