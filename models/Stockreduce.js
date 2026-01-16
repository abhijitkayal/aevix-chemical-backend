// const mongoose = require("mongoose");
import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  warehouse: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
});

// module.exports = mongoose.model("Stockreduce", StockSchema);
export default mongoose.models.Stockreduce || mongoose.model("Stockreduce", StockSchema);
