import mongoose from "mongoose";

const WarehouseSchema = new mongoose.Schema(
  {
    warehouse: { type: String, required: true },
    location: { type: String, required: true },
    totalItems: { type: Number, required: true },
    capacity: { type: Number, required: true },
    // value: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Warehouse", WarehouseSchema);