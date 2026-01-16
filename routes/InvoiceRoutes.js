import express from "express";
import Invoice from "../models/Invoice.js";
import Product from "../models/Product.js";
import Warehouse from "../models/Warehouse.js";
import Client from "../models/Client.js";
import { generateInvoicePDF } from "../utils/Invoicepdf.js";

const router = express.Router();

/* ======================
   GET ALL INVOICES
====================== */
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("warehouseId", "warehouse")
      .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch invoices",
      error: err.message,
    });
  }
});

/* ======================
   DOWNLOAD INVOICE PDF
====================== */
router.get("/:id/download", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("warehouseId");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    generateInvoicePDF(invoice, res);
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ message: err.message });
    }
  }
});

/* ======================
   CREATE INVOICE
====================== */
router.post("/", async (req, res) => {
  try {
    const {
      customer,
      warehouseId,
      productName,
      quantity,
    } = req.body;

    /* ======================
       1️⃣ BASIC VALIDATION
    ====================== */
    if (!warehouseId || !productName || !quantity) {
      return res.status(400).json({
        message: "warehouseId, productName and quantity are required",
      });
    }

    /* ======================
       2️⃣ PRODUCT STOCK CHECK
    ====================== */
    const product = await Product.findOne({
      warehouseId,
      productName,
    });

    if (!product) {
      return res.status(404).json({
        message: `Product "${productName}" not found in this warehouse`,
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        message: `Insufficient stock. Available: ${product.quantity}, Requested: ${quantity}`,
      });
    }

    /* ======================
       3️⃣ FIND CLIENT (OPTIONAL)
    ====================== */
    const client = await Client.findOne({
      clientName: customer,
    });

    /* ======================
       4️⃣ LEDGER CHECK (ONLY IF CLIENT EXISTS)
    ====================== */
    if (client && client.totalQuantity < quantity) {
      return res.status(400).json({
        message: `Ledger quantity insufficient. Available: ${client.totalQuantity}`,
      });
    }

    /* ======================
       5️⃣ CREATE INVOICE
    ====================== */
    const invoice = await Invoice.create(req.body);

    /* ======================
       6️⃣ UPDATE PRODUCT STOCK (ALWAYS)
    ====================== */
    product.quantity -= quantity;
    await product.save();

    /* ======================
       7️⃣ UPDATE CLIENT LEDGER (ONLY IF FOUND)
    ====================== */
    let ledgerUpdate = null;

    if (client) {
      // client.totalQuantity -= quantity;
      await client.save();

      ledgerUpdate = {
        clientName: client.clientName,
        remainingQuantity: client.totalQuantity,
      };
    }

    /* ======================
       8️⃣ UPDATE WAREHOUSE TOTAL
    ====================== */
    const warehouse = await Warehouse.findById(warehouseId);
    if (warehouse) {
      const products = await Product.find({ warehouseId });
      warehouse.totalItems = products.reduce(
        (sum, p) => sum + p.quantity,
        0
      );
      await warehouse.save();
    }

    /* ======================
       9️⃣ RESPONSE
    ====================== */
    res.status(201).json({
      message: "Invoice created successfully",
      invoice,
      updates: {
        product: {
          productName: product.productName,
          remainingQuantity: product.quantity,
        },
        ledger: ledgerUpdate, // null if client not found
      },
    });

  } catch (err) {
    res.status(500).json({
      message: "Invoice creation failed",
      error: err.message,
    });
  }
});

export default router;
