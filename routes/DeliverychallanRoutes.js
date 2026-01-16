import express from "express";
import DeliveryChallan from "../models/Deliverychallan.js";

const router = express.Router();

/* CREATE */
router.post("/", async (req, res) => {
  try {
    const challan = await DeliveryChallan.create(req.body);
    res.status(201).json(challan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* GET ALL */
router.get("/", async (req, res) => {
  try {
    const challans = await DeliveryChallan.find().sort({ createdAt: -1 });
    res.json(challans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
