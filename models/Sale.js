// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    place: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ['Kg', 'Litre', 'Piece', 'Ton'],
      required: true
    }
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Sale', saleSchema);
export default mongoose.model('Sale', saleSchema);