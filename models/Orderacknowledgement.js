// const mongoose = require("mongoose");
import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    hsn: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    gstAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false } // embedded schema
);

// export default ItemSchema;


const OrderAckSchema = new mongoose.Schema(
  {
    oaNumber: {
      type: String,
      unique: true,
      required: true,
    },
    
    supplier: {
      name: String,
      address: String,
      shipFrom: String,
    },

    shippingDetails: {
      netWeight: String,
      grossWeight: String,
      orderDate: Date,
      dispatchDate: Date,
    },

    buyer: {
      name: String,
      address: String,
      gst: String,
    },

    shippingAddress: String,

    items: [ItemSchema],

    quotation: {
      quotationNumber: String,
      quotationDate: Date,
      piNumber: String,
      piDate: Date,
      poNumber: String,
      poDate: Date,
      paymentTerms: String,
    },

    packingDetails: {
      packSize: String,
      packingType: String,
      color: String,
      label: String,
    },

    transportDetails: {
      transportName: String,
      bookingPoint: String,
      bookingPersonName: String,
      bookingPersonContact: String,
    },

    totalAmount: Number,
    paymentDetails: {
  paymentType: {
    type: String,
    enum: ["UPI", "Cash", "Cheque", "NEFT", "RTGS"],
    required: false,
  },
  referenceNumber: {
    type: String,
  },
  additionalDocuments: {
    type: String,
  },
  additionalNotes: {
    type: String,
  },
},

  },
  
  { timestamps: true }
);

// module.exports = mongoose.model("OrderAcknowledgement", OrderAckSchema);
export default mongoose.model("OrderAcknowledgement", OrderAckSchema);