import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/* CREATE PRODUCT */
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: "Failed to add product",
      error: err.message,
    });
  }
});

/* GET PRODUCTS BY WAREHOUSE */
router.get("/:warehouseId", async (req, res) => {
  try {
    const products = await Product.find({
      warehouseId: req.params.warehouseId,
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: err.message,
    });
  }
});

/* GET ALL PRODUCTS (for debugging) */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate('warehouseId');
    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch all products",
      error: err.message,
    });
  }
});

export default router;
