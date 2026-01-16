// const express = require("express");
import express from "express";
const router = express.Router();
// const Lead = require("../models/Lead");
import Lead from "../models/Leads.js";

/* CREATE LEAD */
router.post("/", async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* GET ALL LEADS */
router.get("/", async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

/* UPDATE LEAD */
router.put("/:id", async (req, res) => {
  const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

/* DELETE LEAD */
router.delete("/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// module.exports = router;
export default router;