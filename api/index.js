import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection with caching for serverless
let isConnected = false;

async function connectToDatabase() {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect("mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/aevix_chemical?retryWrites=true&w=majority&appName=HACKETHIC", {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });
    
    isConnected = true;
    console.log("MongoDB Connected");
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

// Lazy load routes after DB connection
app.use('/api/auth', async (req, res, next) => {
  const authRoutes = (await import('../routes/AuthRoutes.js')).default;
  authRoutes(req, res, next);
});

app.use("/api/invoices", async (req, res, next) => {
  const invoiceRoutes = (await import('../routes/InvoiceRoutes.js')).default;
  invoiceRoutes(req, res, next);
});

app.use("/api/purchase-invoices", async (req, res, next) => {
  const purchaseInvoiceRoutes = (await import('../routes/PurchaseinvoiceRoutes.js')).default;
  purchaseInvoiceRoutes(req, res, next);
});

app.use("/api/warehouses", async (req, res, next) => {
  const warehouseRoutes = (await import('../routes/WarehouseRoutes.js')).default;
  warehouseRoutes(req, res, next);
});

app.use("/api/products", async (req, res, next) => {
  const productRoutes = (await import('../routes/ProductRoutes.js')).default;
  productRoutes(req, res, next);
});

app.use('/api/inward-payments', async (req, res, next) => {
  const inwardPaymentRoutes = (await import('../routes/InwardpaymentRoutes.js')).default;
  inwardPaymentRoutes(req, res, next);
});

app.use("/api/outward-payments", async (req, res, next) => {
  const outwardPaymentRoutes = (await import('../routes/OutwardpaymentRoutes.js')).default;
  outwardPaymentRoutes(req, res, next);
});

app.use("/api/credit-notes", async (req, res, next) => {
  const creditNoteRoutes = (await import('../routes/CreditnoteRoutes.js')).default;
  creditNoteRoutes(req, res, next);
});

app.use("/api/debit-notes", async (req, res, next) => {
  const debitNoteRoutes = (await import('../routes/DebitnoteRoutes.js')).default;
  debitNoteRoutes(req, res, next);
});

app.use("/api/proforma", async (req, res, next) => {
  const proformaRoutes = (await import('../routes/ProformaRoutes.js')).default;
  proformaRoutes(req, res, next);
});

app.use("/api/packing-list", async (req, res, next) => {
  const packingRoutes = (await import('../routes/PackinglistRoutes.js')).default;
  packingRoutes(req, res, next);
});

app.use("/api/delivery-challan", async (req, res, next) => {
  const deliveryChallanRoutes = (await import('../routes/DeliverychallanRoutes.js')).default;
  deliveryChallanRoutes(req, res, next);
});

app.use("/api/quotations", async (req, res, next) => {
  const quotationRoutes = (await import('../routes/QuotationRoute.js')).default;
  quotationRoutes(req, res, next);
});

app.use("/api/stocks", async (req, res, next) => {
  const stockRoutes = (await import('../routes/StockRoutes.js')).default;
  stockRoutes(req, res, next);
});

app.use("/api/jobworks", async (req, res, next) => {
  const jobworkRoutes = (await import('../routes/JobworkRoutes.js')).default;
  jobworkRoutes(req, res, next);
});

app.use("/api/movements", async (req, res, next) => {
  const movementRoutes = (await import('../routes/MovementRoutes.js')).default;
  movementRoutes(req, res, next);
});

app.use("/api/users", async (req, res, next) => {
  const userRoutes = (await import('../routes/UserRoutes.js')).default;
  userRoutes(req, res, next);
});

app.use("/api/roles", async (req, res, next) => {
  const roleRoutes = (await import('../routes/RoleRoutes.js')).default;
  roleRoutes(req, res, next);
});

app.use("/api/leads", async (req, res, next) => {
  const leadsRoutes = (await import('../routes/LeadRoutes.js')).default;
  leadsRoutes(req, res, next);
});

app.use("/api/order-acknowledgements", async (req, res, next) => {
  const orderAcknowledgement = (await import('../routes/Orderacknowledgement.js')).default;
  orderAcknowledgement(req, res, next);
});

app.use("/api/clients", async (req, res, next) => {
  const clientRoutes = (await import('../routes/ClientRoutes.js')).default;
  clientRoutes(req, res, next);
});

app.use("/api/sales", async (req, res, next) => {
  const saleRoutes = (await import('../routes/SaleRoutes.js')).default;
  saleRoutes(req, res, next);
});

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
