import mongoose from "mongoose";

const ProformaSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    address: String,
    contactPerson: String,
    phone: String,
    gstin: String,
    placeOfSupply: String,

    proformaNo: { type: String, required: true },
    proformaDate: { type: String, required: true },
    challanNo: String,
    challanDate: String,
    lrNo: String,
    deliveryMode: String,
  },
  { timestamps: true }
);

export default mongoose.model("Proforma", ProformaSchema);
