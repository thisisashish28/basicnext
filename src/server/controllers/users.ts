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
    console.log("Creating user with account: ", name, email, password);
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

//otp functions

export async function setOtp(email: string, otp: string): Promise<void> {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    if(user.isverified === true){
      throw new Error("User already verified");
    }
    //const isverified = await user.findOne{{}}
    user.otp = otp;

    await user.save();
  } catch (err) {
    console.error("Error setting otp: ", err);
    throw err;
  }
}

export async function getOtp(email: string): Promise<string | null> {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return user.otp;
  } catch (err) {
    console.error("Error getting otp: ", err);
    throw err;
  }
}

export async function setVerified(email: string): Promise<void> {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    user.isverified = true;
    user.otp = null;
    await user.save();
  } catch (err) {
    console.error("Error setting verified: ", err);
    throw err;
  }
}
