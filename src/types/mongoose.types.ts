import { Document } from "mongoose";

export interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

export interface ISession extends Document {
  email: string;
  loginToken: string;
  tokenCreatedAt: Date;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}
