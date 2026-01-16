// const express = require("express");
// const Stock = require("../models/Stock");
import Stock from "../models/Stock.js";
import express from "express";

const router = express.Router();

/* ADD STOCK */
router.post("/", async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).json(stock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { currentStock, reorderLevel } = req.body;

    let status = "Good";
    if (currentStock <= reorderLevel * 0.5) status = "Critical";
    else if (currentStock <= reorderLevel) status = "Low";

    const updated = await Stock.findByIdAndUpdate(
      req.params.id,
      { ...req.body, status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


/* GET ALL STOCK */
router.get("/", async (req, res) => {
  try {
    const stock = await Stock.find().sort({ createdAt: -1 });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// module.exports = router;
export default router;
