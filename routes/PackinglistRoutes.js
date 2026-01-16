import express from "express";
import PackingList from "../models/Packinglist.js";

const router = express.Router();

/* CREATE */
router.post("/", async (req, res) => {
  try {
    const packing = await PackingList.create(req.body);
    res.status(201).json(packing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* GET ALL */
router.get("/", async (req, res) => {
  try {
    const data = await PackingList.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
