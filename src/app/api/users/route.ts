import { createUserWithAccount } from "@/utils/users";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { getUserByEmail } from "@/utils/users"; // Ensure you import this function if it's in the same file

// Define the request body type
interface RequestBody {
  name: string;
  email: string;
  password: string;
}

// Define the response type
interface ResponseData {
  message: string;
  data?: any; // Adjust type as needed
}

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    const { name, email, password }: RequestBody = await req.json();
    
    // Check if user already exists
    const existingUser = await getUserByEmail({ email });
    if (existingUser) {
      return NextResponse.json({
        message: "Email is already in use."
      }, { status: 400 });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the new user
    await createUserWithAccount({
      name,
      email,
      password: hashedPassword
    });
    
    return NextResponse.json({
      message: "User created"
    }, {
      status: 201
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({
      message: "Error",
      error: error.message || "An unexpected error occurred"
    }, { status: 500 });
  }
}
