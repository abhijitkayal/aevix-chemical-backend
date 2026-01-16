import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: { type: String, unique: true },
    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
