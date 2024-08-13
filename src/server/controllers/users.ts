import dbConnect from "../utils/dbConnect";
import User from "@/server/models/User";
import { IUser } from "@/types";

export async function createUserWithAccount(
  name: string,
  email: string,
  password: string
): Promise<void> {
  try {
    await dbConnect();
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
  } catch (error) {
    console.error("Error creating the user: ", error);
    throw error;
  }
}

// Function to get a user by email
export async function getUserByEmail(email: string): Promise<IUser | null> {
  try {
    await dbConnect();
    const user = await User.findOne({ email });

    return user ? (user.toObject() as IUser) : null;
  } catch (err) {
    console.error("Error getting user by email: ", err);
    throw err;
  }
}
