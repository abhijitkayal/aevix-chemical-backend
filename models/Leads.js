// const mongoose = require("mongoose");
import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ["New", "In Progress", "Converted", "Lost"],
      default: "New",
    },
    owner: { type: String, required: true },
    followUpDate: { type: Date },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Lead", LeadSchema);
export default mongoose.model("Lead", LeadSchema);