import mongoose, { Document, Schema } from "mongoose";

interface ILogInInform extends Document {
  email: string;
  loginToken: string;
  tokenCreatedAt: Date;
}

const LogInInformSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  loginToken: { type: String, required: true },
  tokenCreatedAt: { type: Date, default: Date.now }, // Store when the token was created
});

// Create a TTL index on `tokenCreatedAt` to expire documents after 1 hour
LogInInformSchema.index({ tokenCreatedAt: 1 }, { expireAfterSeconds: 3600 });

export default mongoose.models.LogInInform || mongoose.model<ILogInInform>("LogInInform", LogInInformSchema);
