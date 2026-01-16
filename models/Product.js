import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: String,
    price: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
