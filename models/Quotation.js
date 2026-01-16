// const mongoose = require("mongoose");
import mongoose from "mongoose";

const QuotationSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    address: String,
    contactPerson: String,
    phone: String,
    gstin: String,
    placeOfSupply: String,

    // quotationType: String,
    quotationNo: String,
    quotationDate: String,
    challanNo: String,
    challanDate: String,
    lrNo: String,
    deliveryMode: String,

    status: { type: String, default: "Draft" },
  },
  { timestamps: true }
);

export default mongoose.model("Quotation", QuotationSchema);
// module.exports = mongoose.model("Quotation", QuotationSchema);
