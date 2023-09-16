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
      default: "pending",
    },
    hodApproval: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    coordinatorApproval: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    advisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
    hod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
    coordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
  },
  { timestamps: true }
);

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
