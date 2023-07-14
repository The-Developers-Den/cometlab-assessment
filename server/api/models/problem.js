const mongoose = require("mongoose");

const problemSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    body: { type: String, required: true },
    masterjudge: {
      id: { type: Number },
      name: { type: String },
      uri: { type: String },
    },
    testcases: [
      {
        number: { type: Number },
        active: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Problems", problemSchema);
