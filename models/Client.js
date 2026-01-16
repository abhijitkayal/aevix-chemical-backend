import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    location: String,
    totalQuantity: Number,
    unit: String,
    monthlyTarget: Number,
  },
  { timestamps: true }
);

export default mongoose.model('Client', ClientSchema);
