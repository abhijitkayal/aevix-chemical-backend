// const mongoose = require("mongoose");
import mongoose from "mongoose";

const StockMovementSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: {
      type: String,
      required: true,
      enum: ["Kg", "Liter", "Pieces", "Boxes", "Packets", "Ton"],
    },
    unitPrice: Number,

    fromWarehouse: { type: String, required: true },

    toType: {
      type: String,
      enum: ["Client", "Warehouse"],
      required: true,
    },

    toClientName: String,
    toWarehouse: String,

    date: { type: Date, required: true },
    remarks: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model("StockMovement", StockMovementSchema);
export default mongoose.model("StockMovement", StockMovementSchema);
