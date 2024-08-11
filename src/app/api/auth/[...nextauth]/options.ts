import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { generateToken } from "./utils/jwtUtils";
import { NextResponse } from "next/server";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "hello@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password } = credentials;
        await dbConnect();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("No user found with the provided email");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        const token = generateToken({ id: user._id, email: user.email });
        const response = user.toObject();
        response.token = token;

        if (passwordMatch) {

          return response;
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.customToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.customToken = token.customToken;
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      if (user) {
        // You can set the custom token in a cookie here.
        const res = NextResponse.next();
        res.cookies.set('customToken', user.token);
      }
    },
  },
};
