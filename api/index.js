import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import warehouseRoutes from "../routes/WarehouseRoutes.js";
import invoiceRoutes from "../routes/InvoiceRoutes.js";
import productRoutes from "../routes/ProductRoutes.js";
import inwardPaymentRoutes from "../routes/InwardpaymentRoutes.js"
import outwardPaymentRoutes from "../routes/OutwardpaymentRoutes.js";
import creditNoteRoutes from "../routes/CreditnoteRoutes.js";
import debitNoteRoutes from "../routes/DebitnoteRoutes.js";
import proformaRoutes from "../routes/ProformaRoutes.js";
import packingRoutes from "../routes/PackinglistRoutes.js";
import deliveryChallanRoutes from "../routes/DeliverychallanRoutes.js";
import quotationRoutes from "../routes/QuotationRoute.js";
import stockRoutes from "../routes/StockRoutes.js";
import jobworkRoutes from "../routes/JobworkRoutes.js";
import movementRoutes from "../routes/MovementRoutes.js";
import userRoutes from "../routes/UserRoutes.js";
import RoleRoutes from "../routes/RoleRoutes.js";
import leadsRoutes from "../routes/LeadRoutes.js";
import OrderAcknowledgement from "../routes/Orderacknowledgement.js";
import purchaseInvoiceRoutes from "../routes/PurchaseinvoiceRoutes.js";  
import authRoutes from '../routes/AuthRoutes.js';
import clientRoutes from '../routes/ClientRoutes.js';
import saleRoutes from '../routes/SaleRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection with caching for serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    const connection = await mongoose.connect("mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/aevix_chemical?retryWrites=true&w=majority&appName=HACKETHIC", {
      serverSelectionTimeoutMS: 5000,
    });
    
    cachedDb = connection;
    console.log("MongoDB Connected");
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Aevix Chemical Backend API is running",
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

app.get("/api", (req, res) => {
  res.json({ 
    message: "Aevix Chemical Backend API",
    version: "1.0.0",
    endpoints: [
      "/api/auth",
      "/api/invoices",
      "/api/warehouses",
      "/api/products",
      "/api/clients"
    ]
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/purchase-invoices", purchaseInvoiceRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/products", productRoutes);
app.use('/api/inward-payments', inwardPaymentRoutes);
app.use("/api/outward-payments", outwardPaymentRoutes);
app.use("/api/credit-notes", creditNoteRoutes);
app.use("/api/debit-notes", debitNoteRoutes);
app.use("/api/proforma", proformaRoutes);
app.use("/api/packing-list", packingRoutes);
app.use("/api/delivery-challan", deliveryChallanRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/jobworks", jobworkRoutes);
app.use("/api/movements", movementRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", RoleRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/order-acknowledgements", OrderAcknowledgement);
app.use("/api/clients", clientRoutes);
app.use("/api/sales", saleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.path });
});

// Vercel serverless function handler
export default async function handler(req, res) {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Database connection failed',
      message: error.message 
    });
  }
}
