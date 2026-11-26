import mongoose from "mongoose";

export interface IBookingLock {
  _id: string;
  owner: string;
  expiresAt: Date;
}

const BookingLockSchema = new mongoose.Schema<IBookingLock>(
  {
    _id: { type: String, required: true },
    owner: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false },
);

// Índice TTL para limpar automaticamente locks expirados caso o processo caia
BookingLockSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default (mongoose.models.BookingLock as mongoose.Model<IBookingLock>) ||
  mongoose.model<IBookingLock>("BookingLock", BookingLockSchema);
