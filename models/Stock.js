// const mongoose = require("mongoose");
import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    itemCode: { type: String, required: true, unique: true },
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    currentStock: { type: Number, required: true },
    unit: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    reorderLevel: { type: Number, required: true },
    warehouse: { type: String, required: true },
    supplier: { type: String, required: true },
    expiryDate: { type: String },
    status: { type: String, default: "Good" }
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Stock", stockSchema);
export default mongoose.models.Stock || mongoose.model("Stock", stockSchema);
