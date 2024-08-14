import NextAuth from "next-auth";
import { options } from "./options";
import { NextRequest } from "next/server";
import { RouteHandlerContext } from "@/types";

const handler = async (req: NextRequest, context: RouteHandlerContext) => {
  return NextAuth(req, context, options);
};

export { handler as GET, handler as POST };
