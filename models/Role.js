// const mongoose = require("mongoose");
import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    roleId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["System", "Departmental", "Operational"],
      required: true,
    },

    permissions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Role", RoleSchema);
export default mongoose.model("Role", RoleSchema);