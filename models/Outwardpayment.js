import mongoose from "mongoose";

const outwardPaymentSchema = new mongoose.Schema(
  {
    paymentNo: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    address: { type: String },
    paymentDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    paymentType: {
      type: String,
      enum: [
        "Bank Transfer",
        "NEFT",
        "RTGS",
        "Cheque",
        "Cash",
        "Online Payment",
      ],
      required: true,
    },
    attachment: { type: String }, // filename
  },
  { timestamps: true }
);

export default mongoose.model("OutwardPayment", outwardPaymentSchema);
