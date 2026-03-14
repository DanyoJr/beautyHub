import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  roles: string;
  permissions: string[];
  googleId?: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    roles: { type: String, required: true },
    permissions: { type: [String], default: [] },
    googleId: { type: String },
  },
  { timestamps: true },
);

export default (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
