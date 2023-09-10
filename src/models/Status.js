const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statusSchema = new Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    advisorApproval: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
    },
    hodApproval: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
    },
    coordinatorApproval: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Status", statusSchema);

module.exports = Status;
