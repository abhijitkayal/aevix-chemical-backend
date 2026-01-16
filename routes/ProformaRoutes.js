import express from "express";
import Proforma from "../models/Proforma.js";

const router = express.Router();

/* CREATE PROFORMA */
router.post("/", async (req, res) => {
  try {
    const proforma = await Proforma.create(req.body);
    res.status(201).json(proforma);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* GET ALL PROFORMAS */
router.get("/", async (req, res) => {
  const data = await Proforma.find().sort({ createdAt: -1 });
  res.json(data);
});

export default router;
