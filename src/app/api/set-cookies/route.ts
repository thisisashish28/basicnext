import { NextResponse } from "next/server";
import dbConnect from "@/server/utils/dbConnect";
import { v4 as uuidv4 } from "uuid";
import session from "@/server/models/session";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();
    const token = uuidv4();

    if (!email) {
      return NextResponse.json(
        {
          error:
            "Token and email are required or the email you entered is not registered",
        },
        { status: 400 }
      );
    }

    const existingSession = await session.findOne({ email });
    if (existingSession) {
      existingSession.token = token;
      existingSession.tokenCreatedAt = new Date();
      await existingSession.save();
    } else {
      const newSession = new session({
        email,
        token: token,
        tokenCreatedAt: new Date(),
      });
      await newSession.save();
    }

    return new Response("Session Created", {
      status: 200,
      headers: { "Set-Cookie": `customToken=${token}` },
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
