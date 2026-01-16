const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
  material: String,
  quantity: Number,
  unit: String,
  rate: Number,
});

const JobWorkSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    address: String,
    contactPerson: String,
    phone: String,
    gstin: String,
    placeOfSupply: String,

    jobType: String,
    jobWorkNo: String,
    jobWorkDate: Date,
    challanNo: String,
    challanDate: Date,
    lrNo: String,
    deliveryMode: String,

    jobWorker: String,
    location: String,
    processType: String,
    product: String,
    deliveryDate: Date,

    materialsSent: [MaterialSchema],
    materialsReceived: [MaterialSchema],

    jobWorkCost: Number,
    totalCost: Number,

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Partial", "Pending"],
      default: "Pending",
    },

    paidAmount: Number,
    remarks: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobWork", JobWorkSchema);

