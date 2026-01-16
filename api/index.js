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

app.use(cors());
app.use(express.json());

// MongoDB connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const connection = await mongoose.connect("mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/aevix_chemical?retryWrites=true&w=majority&appName=HACKETHIC");
  
  cachedDb = connection;
  console.log("MongoDB Connected");
  return connection;
}

// Connect to database
connectToDatabase().catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/purchase-invoices", purchaseInvoiceRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/products", productRoutes);
app.use('/uploads', express.static('uploads'));
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

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Aevix Chemical Backend API is running" });
});

export default app;
