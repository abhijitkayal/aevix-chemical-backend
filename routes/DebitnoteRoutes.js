import express from "express";
import DebitNote from "../models/Debitnote.js";

const router = express.Router();

/* ================= CREATE CREDIT NOTE ================= */
router.post("/", async (req, res) => {
  try {
    const debitNote = await DebitNote.create(req.body);
    res.status(201).json(debitNote);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

/* ================= GET ALL CREDIT NOTES ================= */
router.get("/", async (req, res) => {
  try {
    const debitNotes = await DebitNote.find().sort({ createdAt: -1 });
    res.json(debitNotes);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
