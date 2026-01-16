import express from "express";
import Warehouse from "../models/Warehouse.js";

const router = express.Router();

/* GET all warehouses */
router.get("/", async (req, res) => {
  try {
    const warehouses = await Warehouse.find().sort({ createdAt: -1 });
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ADD warehouse */
router.post("/", async (req, res) => {
  try {
    const warehouse = await Warehouse.create(req.body);
    res.status(201).json(warehouse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ✅ THIS LINE IS IMPORTANT */
export default router;
