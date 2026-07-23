const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['paragraph', 'list', 'nested_list', 'table', 'equation'],
      required: true,
    },
    // Shape varies by block type; validated at the API boundary via zod, not here.
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    order: { type: Number, required: true, default: 0 },
  },
  { _id: true },
);

const SectionSchema = new mongoose.Schema(
  {
    // e.g. [2, 1, 1] renders as "2.1.1" — flat path instead of recursive nesting.
    numbering: { type: [Number], required: true },
    title: { type: String, required: true, trim: true },
    blocks: { type: [BlockSchema], default: [] },
    order: { type: Number, required: true, default: 0 },
  },
  { _id: true },
);

const StandardVersionSchema = new mongoose.Schema(
  {
    standard: { type: mongoose.Schema.Types.ObjectId, ref: 'Standard', required: true },
    versionNumber: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['draft', 'public_consultation', 'certified'],
      default: 'draft',
    },
    consultationStart: { type: Date },
    consultationEnd: { type: Date },
    certifiedDate: { type: Date },
    sections: { type: [SectionSchema], default: [] },
  },
  { timestamps: true },
);

StandardVersionSchema.index({ standard: 1, versionNumber: 1 }, { unique: true });

module.exports = mongoose.model('StandardVersion', StandardVersionSchema);
