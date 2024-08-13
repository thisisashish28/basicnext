import {
  createUserWithAccount,
  getUserByEmail,
} from "@/server/controllers/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Define the request body type
type RequestBody = {
  name: string;
  email: string;
  password: string;
};

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    const { name, email, password }: RequestBody = await req.json();
    console.log(name, email, password);
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email is already in use.",
        },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    await createUserWithAccount(name, email, hashedPassword);

    return NextResponse.json(
      {
        message: "User created",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("Error in POST handler:", error);
    return NextResponse.json(
      {
        message: "Error",
        error: error.message || "An unexpected error occurred",
      },
      { status: 500 }
    );
    // console.log(error);
  }
};
