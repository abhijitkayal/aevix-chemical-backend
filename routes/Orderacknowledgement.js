// const express = require("express");
import express from "express";
const router = express.Router();
// const OrderAck = require("../models/OrderAcknowledgement");
import OrderAck from "../models/Orderacknowledgement.js";

/* CREATE */
router.post("/", async (req, res) => {
  try {
    // Auto-generate OA number
    const count = await OrderAck.countDocuments();
    const oaNumber = `OA${String(count + 1).padStart(4, '0')}`;
    
    const oa = new OrderAck({
      ...req.body,
      oaNumber
    });
    await oa.save();
    res.status(201).json(oa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* GET ALL */
router.get("/", async (req, res) => {
  const data = await OrderAck.find().sort({ createdAt: -1 });
  res.json(data);
});

/* GET ONE */
router.get("/:id", async (req, res) => {
  const data = await OrderAck.findById(req.params.id);
  res.json(data);
});

// module.exports = router;
export default router;