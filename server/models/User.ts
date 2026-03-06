import mongoose from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  roles: string;
  permissions: [string];
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: String, required: true },
    permissions: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
