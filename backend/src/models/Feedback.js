const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, trim: true },
    comment: { type: String, required: true, trim: true },
    score: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true },
);

const FeedbackSchema = new mongoose.Schema(
  {
    version: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StandardVersion',
      required: true,
      unique: true,
    },
    averageScore: { type: Number, default: 0 },
    totalResponses: { type: Number, default: 0 },
    comments: { type: [CommentSchema], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Feedback', FeedbackSchema);
