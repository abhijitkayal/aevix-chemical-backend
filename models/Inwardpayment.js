// const mongoose = require('mongoose');
import mongoose from "mongoose";

const inwardPaymentSchema = new mongoose.Schema(
  {
    receiptNo: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    address: { type: String },
    paymentDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    paymentType: {
      type: String,
      enum: ['Bank Transfer', 'Cheque', 'Cash', 'RTGS/NEFT'],
      required: true,
    },
    attachment: { type: String }, // file path
  },
  { timestamps: true }
);

// module.exports = mongoose.model('InwardPayment', inwardPaymentSchema);

export default mongoose.model("InwardPayment", inwardPaymentSchema);