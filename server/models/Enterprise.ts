import mongoose from "mongoose";

export interface IEnterprise {}

const EnterpriseSchema = new mongoose.Schema<IEnterprise>(
  {},
  { timestamps: true },
);

export default (mongoose.models.Enterprise as mongoose.Model<IEnterprise>) ||
  mongoose.model<IEnterprise>("Enterprise", EnterpriseSchema);
