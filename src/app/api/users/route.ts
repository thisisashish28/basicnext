import {
  createUserWithAccount,
  getUserByEmail,
} from "@/server/controllers/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";

// Define the request body type
type RequestBody = {
  name: string;
  email: string;
  password: string;
};

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const image = formData.get("image");

    // Validate input
    if (!name || !email || !password || !image) {
      return NextResponse.json(
        {
          message: "All fields (name, email, password, image) are required.",
        },
        { status: 400 }
      );
    }

    // Check if image is a File object
    if (!(image instanceof File)) {
      return NextResponse.json(
        {
          message: "Invalid image file.",
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email.toString());
    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email is already in use.",
        },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    // Save the image to the filesystem
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const imageName = `${Date.now()}_${image.name}`;
    const imagePath = path.join(process.cwd(), "public/images", imageName);

    // Ensure the directory exists
    await fs.mkdir(path.dirname(imagePath), { recursive: true });

    // Write the file
    await fs.writeFile(imagePath, imageBuffer);

    // Create the new user with the image path
    await createUserWithAccount(
      name.toString(),
      email.toString(),
      hashedPassword,
      imagePath
    );

    return NextResponse.json(
      {
        message: "User created successfully.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error in POST handler:", error);
    return NextResponse.json(
      {
        message: "Error",
        error: error.message || "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
};
