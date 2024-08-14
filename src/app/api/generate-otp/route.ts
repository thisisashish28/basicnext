import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { setOtp } from "@/server/controllers/users";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email } = await req.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: "Name and email are required." },
        { status: 400 }
      );
    }

    // OTP Generate karna
    // const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const otp: string = otpGenerator.generate(4, {
      digits: true,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Email Setup karna
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "Your OTP for Sign-Up",
    //   text: `Your OTP is ${otp}`,
    // };

    // await transporter.sendMail(mailOptions);

    // Store OTP and user info in temporary storage
    // await storeOtpAndUserDetails({ name, email, otp });
    await setOtp(email, otp);

    return NextResponse.json(
      { message: "OTP sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error in sending OTP:", error);
    return NextResponse.json(
      {
        message: "Error",
        error: error.message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
