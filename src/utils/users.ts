import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";
import { v4 as uuidv4 } from "uuid";

// Function to create a user with an account
export async function createUserWithAccount({ name, email, password }: IUser): Promise<void> {
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
