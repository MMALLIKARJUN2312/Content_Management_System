const mongoose = require('mongoose');

const StandardSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    icon: { type: String, default: 'Leaf' },
    summary: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Standard', StandardSchema);
