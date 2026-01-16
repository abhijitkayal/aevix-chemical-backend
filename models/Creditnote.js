import mongoose from "mongoose";

const creditNoteSchema = new mongoose.Schema(
  {
    ms: { type: String, required: true },          // M/S
    address: String,
    contactPerson: String,
    phone: String,
    gstin: String,
    placeOfSupply: { type: String, required: true },

    docType: String,
    dnType: String,

    dnNo: { type: String, required: true },
    dnDate: { type: Date, required: true },

    invoiceNo: { type: String, required: true },
    invoiceDate: Date,

    challanNo: String,
    challanDate: Date,
    lrNo: String,
    eWayNo: String,

    deliveryMode: String,

    amount: { type: Number, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("CreditNote", creditNoteSchema);
