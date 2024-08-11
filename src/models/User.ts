import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  loggedin?: Date; // Change to Date for TTL indexing
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  loggedin: { type: Date, expires: 3600 }, // TTL index set to 1 hour
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
