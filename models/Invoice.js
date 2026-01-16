// import mongoose from "mongoose";

// const InvoiceSchema = new mongoose.Schema(
//   {
//     customer: String,
//     customerId: String,
//     warehouseId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Warehouse",
//       required: true,
//     },
//     Warehouse:{
//       type:String,
//       // required:true,
//     },
//     productName: String,
//     quantity: Number,
//     rate: Number,
//     date: String,
//     dueDate: String,
//     notes: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Invoice", InvoiceSchema);


import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    /* ================= CUSTOMER DETAILS ================= */
    customer: {
      type: String,
      required: true,
      trim: true,
    },

    customerId: {
      type: String,
      required: true,
      trim: true,
    },

    phone: String,
    address: String,

    gstin: {
      type: String,
      uppercase: true,
    },

    pan: {
      type: String,
      uppercase: true,
    },

    state: String,

    placeOfSupply: String,

    /* ================= BANK DETAILS ================= */
    bankDetails: {
      bankName: String,
      accountNo: String,
      ifsc: String,
    },

    /* ================= WAREHOUSE & PRODUCT ================= */
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unit:{
      type: String,
      required: true,
    },

    rate: {
      type: Number,
      required: true,
      min: 0,
    },

    /* ================= DATES ================= */
    date: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      // required: true,
    },

    /* ================= OTHER ================= */
    notes: String,

    status: {
      type: String,
      enum: ["Pending", "Paid", "Cancelled"],
      default: "Pending",
    },

    totalAmount: {
      type: Number,
      default: function () {
        return this.quantity * this.rate;
      },
    },
    shippingDetails: {
  shippingDate: {
    type: Date,
  },
  grossWeight: {
    type: String, // or Number if you prefer
    trim: true,
  },
  netWeight: {
    type: String, // or Number
    trim: true,
  },
  additionalNote: {
    type: String,
    trim: true,
  },
},

  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
