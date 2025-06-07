import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    token?: string;
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      token: string;
      role: string;
      name?: string;
    };
  }
}
