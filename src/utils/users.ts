import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

// Define an interface for the user data
interface UserData {
  name: string;
  email: string;
  password: string;
}

// Define an interface for parameters to get user by email
interface GetUserByEmailParams {
  email: string;
}

// Function to create a user with an account
export async function createUserWithAccount({ name, email, password }: UserData): Promise<void> {
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
        accounts: {
          create: {
            type: "credentials", // Adjust field names if they differ in your schema
            provider: "email",
            providerAccountId: uuidv4(), // Call uuidv4 to generate a new UUID
          },
        },
      },
      include: {
        accounts: true, // Corrected include syntax
      },
    });
  } catch (error) {
    console.error("Error creating the user: ", error);
    throw error;
  }
}

// Function to get a user by email
export async function getUserByEmail({ email }: GetUserByEmailParams): Promise<UserData | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  
    return user as UserData | null; // Type assertion for clarity
  } catch (err) {
    console.error("Error getting user by email: ", err);
    throw err;
  }
}
