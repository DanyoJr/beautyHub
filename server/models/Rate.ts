import mongoose from "mongoose";

export interface IRate {
  starsCounting: string;
  comment: string;
  userID: string;
  enterpriseID: string;
}

const RateSchema = new mongoose.Schema<IRate>(
  {
    starsCounting: { type: String, required: true },
    comment: { type: String, required: true },
    userID: { type: String, required: true },
    enterpriseID: { type: String, required: true },
  },
  { timestamps: true },
);

export default (mongoose.models.Rate as mongoose.Model<IRate>) ||
  mongoose.model<IRate>("Rate", RateSchema);
