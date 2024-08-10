import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma"; // Adjust the import path as needed
import bcrypt from 'bcryptjs';

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any, // Use type assertion cautiously
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

        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user) {
          throw new Error("No user found with the provided email");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          return user;
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
    signIn: '/login',
  }
};
