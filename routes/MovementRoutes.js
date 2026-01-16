// // const express = require("express");
// // const mongoose = require("mongoose");
// import mongoose from "mongoose";
// import express from "express";

// const router = express.Router();

// /* =======================
//    SCHEMA
// ======================= */
// const StockMovementSchema = new mongoose.Schema(
//   {
//     productName: {
//       type: String,
//       required: true,
//     },

//     quantity: {
//       type: Number,
//       required: true,
//     },

//     unitPrice: {
//       type: Number,
//     },

//     /* FROM → ALWAYS WAREHOUSE */
//     fromWarehouse: {
//       type: String,
//       required: true,
//     },

//     /* TO */
//     toType: {
//       type: String,
//       enum: ["Client", "Warehouse"],
//       required: true,
//     },

//     toClientName: {
//       type: String,
//     },

//     toWarehouse: {
//       type: String,
//     },

//     date: {
//       type: Date,
//       required: true,
//     },

//     remarks: String,
//   },
//   { timestamps: true }
// );

// /* =======================
//    VALIDATION
// ======================= */
// StockMovementSchema.pre("save", function (next) {
//   if (this.toType === "Client" && !this.toClientName) {
//     return next(new Error("Client name is required"));
//   }

//   if (this.toType === "Warehouse" && !this.toWarehouse) {
//     return next(new Error("Destination warehouse is required"));
//   }

//   next();
// });

// const StockMovement = mongoose.model(
//   "StockMovement",
//   StockMovementSchema
// );

// /* =======================
//    CREATE MOVEMENT
// ======================= */
// router.post("/", async (req, res) => {
//   try {
//     const movement = new StockMovement(req.body);
//     await movement.save();
//     res.status(201).json(movement);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// /* =======================
//    GET MOVEMENTS
// ======================= */
// router.get("/", async (req, res) => {
//   try {
//     const movements = await StockMovement.find().sort({ createdAt: -1 });
//     res.json(movements);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // module.exports = router;
// export default router;


// const express = require("express");
import express from "express";
const router = express.Router();
import StockMovement from "../models/Stockmovement.js";
import Stockreduce from "../models/Product.js";
import Warehouse from "../models/Warehouse.js";

/* ================= CREATE MOVEMENT ================= */
router.post("/", async (req, res) => {
  try {
    const {
      productName,
      quantity,
      unit,
      unitPrice,
      fromWarehouse,
      toType,
      toClientName,
      toWarehouse,
      date,
      remarks,
    } = req.body;

    if (!productName || !quantity || !unit || !fromWarehouse || !toType || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    /* FIND warehouse by name to get its ID */
    const warehouse = await Warehouse.findOne({ warehouse: fromWarehouse });
    if (!warehouse) {
      return res.status(400).json({ message: "Warehouse not found" });
    }

    console.log("Searching for product:");
    console.log("- productName:", productName);
    console.log("- warehouseId:", warehouse._id.toString());
    console.log("- unit:", unit);

    /* FIND product stock - try exact match first */
    let stockRecord = await Stockreduce.findOne({
      productName: productName.trim(),
      warehouseId: warehouse._id,
      unit: unit.trim(),
    });

    // If not found, try case-insensitive search
    if (!stockRecord) {
      stockRecord = await Stockreduce.findOne({
        productName: { $regex: new RegExp(`^${productName.trim()}$`, 'i') },
        warehouseId: warehouse._id,
        unit: { $regex: new RegExp(`^${unit.trim()}$`, 'i') },
      });
    }

    console.log("Found stockRecord:", stockRecord);

    // Let's also check all products in this warehouse
    const allProductsInWarehouse = await Stockreduce.find({ warehouseId: warehouse._id });
    console.log("All products in warehouse:", allProductsInWarehouse.map(p => ({
      name: p.productName,
      unit: p.unit,
      qty: p.quantity,
      id: p._id
    })));

    if (!stockRecord) {
      return res.status(400).json({
        message: `Stock not found. Available: ${allProductsInWarehouse.map(p => `${p.productName} (${p.unit})`).join(', ') || 'None'}`,
      });
    }

    if (stockRecord.quantity < quantity) {
      return res.status(400).json({
        message: "Insufficient stock quantity",
      });
    }

    /* REDUCE stock */
    stockRecord.quantity -= Number(quantity);
    await stockRecord.save();

    /* CREATE MOVEMENT */
    const movement = await StockMovement.create({
      productName,
      quantity,
      unit,
      unitPrice,
      fromWarehouse,
      toType,
      toClientName,
      toWarehouse,
      date,
      remarks,
    });

    res.status(201).json(movement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET MOVEMENTS ================= */
router.get("/", async (req, res) => {
  const movements = await StockMovement.find().sort({ createdAt: -1 });
  res.json(movements);
});

// module.exports = router;
export default router;