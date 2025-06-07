import { getServerSession } from "next-auth/next";
import { type Session } from "next-auth";

import { authOptions } from "@/config/authOptions";

export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}
