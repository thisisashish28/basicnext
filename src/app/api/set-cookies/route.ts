import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import LogInInform from '@/models/LogInInform';
import  dbConnect  from '@/lib/dbConnect';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { token, email } = await req.json();

    if (!token || !email) {
      return NextResponse.json({ error: 'Token and email are required' }, { status: 400 });
    }

    // Check if the document already exists
    const existingLogInInform = await LogInInform.findOne({ email });
    if (existingLogInInform) {
      // Update token and reset the tokenCreatedAt field
      existingLogInInform.loginToken = token;
      existingLogInInform.tokenCreatedAt = new Date(); // Update the tokenCreatedAt to current time
      await existingLogInInform.save();
    } else {
      // Create a new logInInform document
      const logInInform = new LogInInform({
        email,
        loginToken: token,
        tokenCreatedAt: new Date(), // Set this when the token is created
      });
      await logInInform.save();
    }

    const cookie = serialize('customToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600, // Set cookie to expire in 1 hour
      path: '/',
    });

    const response = NextResponse.json({ success: true });
    response.headers.set('Set-Cookie', cookie);

    return response;
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
