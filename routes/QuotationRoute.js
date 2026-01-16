// const express = require("express");
// const router = express.Router();
// const Quotation = require("../models/Quotation");
import express from "express";
import Quotation from "../models/Quotation.js";
const router = express.Router();
/* CREATE */
router.post("/", async (req, res) => {
  try {
    const quotation = await Quotation.create(req.body);
    res.status(201).json(quotation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* READ ALL */
router.get("/", async (req, res) => {
  const quotations = await Quotation.find().sort({ createdAt: -1 });
  res.json(quotations);
});

export default router;