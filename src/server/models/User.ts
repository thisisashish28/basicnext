import { IUser } from "@/types";
import mongoose, { Document, Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  isverified: { type: Boolean, default: false },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: null },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
