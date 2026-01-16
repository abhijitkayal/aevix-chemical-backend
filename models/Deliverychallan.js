import mongoose from "mongoose";

const DeliveryChallanSchema = new mongoose.Schema(
  {
    /* Customer Info */
    supplyType: { type: String, enum: ["Outward", "Inward"], default: "Outward" },
    customerName: { type: String, required: true },
    address: String,
    contactPerson: String,
    phone: String,
    gstin: String,
    // reverseCharge: { type: String, default: "No" },
    shippingSame: { type: Boolean, default: true },
    placeOfSupply: String,

    /* Delivery Challan Detail */
    // type: String,
    challanPrefix: String,
    challanNo: { type: String, required: true },
    challanPostfix: String,
    challanDate: String,
    lrNo: String,
    ewayNo: String,
    ewayReason: String,
    deliveryMode: String,
  },
  { timestamps: true }
);

export default mongoose.model("DeliveryChallan", DeliveryChallanSchema);
