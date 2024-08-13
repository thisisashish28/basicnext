import { ISession } from "@/types";
import mongoose, { Schema } from "mongoose";

const sessions_schema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true },
  tokenCreatedAt: { type: Date, default: Date.now },
});

// Create a TTL index on `tokenCreatedAt` to expire documents after 1 hour
sessions_schema.index({ tokenCreatedAt: 1 }, { expireAfterSeconds: 3600 });

export default mongoose.models.sessions ||
  mongoose.model<ISession>("sessions", sessions_schema);
