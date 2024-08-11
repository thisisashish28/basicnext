import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  const { token } = await req.json();
//   console.log("Token received:", token); 

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  
  const cookie = serialize('customToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 3600, 
    path: '/', 
  });

  const response = NextResponse.json({ success: true });
  response.headers.set('Set-Cookie', cookie);

  return response;
}
