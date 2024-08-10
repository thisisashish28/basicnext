import NextAuth from "next-auth";
import { NextApiHandler } from "next";
import { options } from "./options";

const handler: NextApiHandler = NextAuth(options);

export { handler as GET, handler as POST };
