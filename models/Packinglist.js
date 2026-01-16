import mongoose from "mongoose";

const PackingListSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    address: String,
    contactPerson: String,
    phone: String,
    gstin: String,
    dispatchFrom: String,
    dispatchAddress: String,
    shippingSame: Boolean,
    placeOfSupply: String,

    packingNo: { type: String, required: true },
    invoiceNo: String,
    invoiceDate: String,
    challanDate: String,
    poNo: String,
    poDate: String,
    lrNo: String,
    ewayNo: String,
    deliveryMode: String,
  },
  { timestamps: true }
);

export default mongoose.model("PackingList", PackingListSchema);
