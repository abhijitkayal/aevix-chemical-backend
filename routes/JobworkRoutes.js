// const express = require("express");
// const mongoose = require("mongoose");
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

/* =========================
   JOB WORK SCHEMA
========================= */
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
const JobWork = mongoose.model("JobWork", JobWorkSchema);

/* =========================
   CREATE JOB WORK
========================= */
router.post("/", async (req, res) => {
  try {
    const jobWork = new JobWork(req.body);
    await jobWork.save();

    res.status(201).json({
      success: true,
      message: "Job Work created successfully",
      data: jobWork,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

/* =========================
   GET ALL JOB WORKS
========================= */
router.get("/", async (req, res) => {
  try {
    const jobWorks = await JobWork.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: jobWorks.length,
      data: jobWorks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// module.exports = router;
export default router;