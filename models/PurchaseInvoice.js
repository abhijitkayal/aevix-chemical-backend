// const mongoose = require('mongoose');
import mongoose from "mongoose";

const PurchaseInvoiceSchema = new mongoose.Schema(
  {
    vendorName: String,
    address: String,
    contactPerson: String,
    phone: String,
    gstin: String,
    // reverseCharge: String,
    placeOfSupply: String,

    // invoiceType: String,
    invoiceNo: String,
    invoiceDate: Date,
    challanNo: String,
    challanDate: Date,
    lrNo: String,
    eWayNo: String,
    deliveryMode: String,
    totalAmount: Number,
  },
  { timestamps: true }
);

// module.exports = mongoose.model(
//   'PurchaseInvoice',
//   PurchaseInvoiceSchema
// );
export default mongoose.model('PurchaseInvoice', PurchaseInvoiceSchema);
// export default mongoose.model("Proforma", ProformaSchema);
