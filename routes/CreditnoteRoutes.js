import express from "express";
import CreditNote from "../models/Creditnote.js";

const router = express.Router();

/* ================= CREATE CREDIT NOTE ================= */
router.post("/", async (req, res) => {
  try {
    const creditNote = await CreditNote.create(req.body);
    res.status(201).json(creditNote);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

/* ================= GET ALL CREDIT NOTES ================= */
router.get("/", async (req, res) => {
  try {
    const creditNotes = await CreditNote.find().sort({ createdAt: -1 });
    res.json(creditNotes);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
