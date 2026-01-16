
import express from "express";
const router = express.Router();
import PurchaseInvoice from '../models/PurchaseInvoice.js';

// Create
router.post('/', async (req, res) => {
  const invoice = await PurchaseInvoice.create(req.body);
  res.json(invoice);
});

// Get all
router.get('/', async (req, res) => {
  const invoices = await PurchaseInvoice.find().sort({ createdAt: -1 });
  res.json(invoices);
});

// module.exports = router;
export default router;
