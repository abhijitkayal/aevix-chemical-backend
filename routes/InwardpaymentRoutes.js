// const express = require('express');
// const multer = require('multer');
// const InwardPayment = require('../models/InwardPayment');
import express from "express";
import multer from "multer";
import InwardPayment from "../models/Inwardpayment.js";

const router = express.Router();

/* FILE UPLOAD */
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

/* CREATE PAYMENT */
router.post('/', upload.single('attachment'), async (req, res) => {
  try {
    const payment = await InwardPayment.create({
      receiptNo: req.body.receiptNo,
      companyName: req.body.companyName,
      address: req.body.address,
      paymentDate: req.body.paymentDate,
      amount: req.body.amount,
      paymentType: req.body.paymentType,
      attachment: req.file?.filename,
    });

    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* GET ALL PAYMENTS */
router.get('/', async (req, res) => {
  const payments = await InwardPayment.find().sort({ createdAt: -1 });
  res.json(payments);
});

export default router;
