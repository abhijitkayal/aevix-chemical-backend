import express from "express";
import multer from "multer";
import OutwardPayment from "../models/Outwardpayment.js";

const router = express.Router();

/* ================= MULTER CONFIG ================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/* ================= CREATE OUTWARD PAYMENT ================= */
router.post("/", upload.single("attachment"), async (req, res) => {
  try {
    const payment = await OutwardPayment.create({
      paymentNo: req.body.paymentNo,
      companyName: req.body.companyName,
      address: req.body.address,
      paymentDate: req.body.paymentDate,
      amount: req.body.amount,
      paymentType: req.body.paymentType,
      attachment: req.file?.filename,
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* ================= GET ALL OUTWARD PAYMENTS ================= */
router.get("/", async (req, res) => {
  try {
    const payments = await OutwardPayment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

export default router;
