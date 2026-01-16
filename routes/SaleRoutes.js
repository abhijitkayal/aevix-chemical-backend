// const express = require('express');
import express from 'express';
// const Sale = require('../models/Sale');
import Sale from '../models/Sale.js';

const router = express.Router();

/**
 * @route   POST /api/sales
 * @desc    Store sell product data
 */
router.post('/', async (req, res) => {
  try {
    const { productName, companyName, place, quantity, unit } = req.body;

    if (!productName || !companyName || !place || !quantity || !unit) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const sale = new Sale({
      productName,
      companyName,
      place,
      quantity,
      unit
    });

    await sale.save();

    res.status(201).json({
      message: 'Product sold successfully',
      sale
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/sales
 * @desc    Get all sold products
 */
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// module.exports = router;
export default router;