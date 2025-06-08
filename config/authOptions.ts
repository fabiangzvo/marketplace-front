import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from "@/lib/axios";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password)
            throw new Error("Credentials are mandatory");

          const response = await axios.post("/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (response.status !== 200) throw response;

          const { user, access_token: token } = response.data;

          if (token && user)
            return {
              id: user.sub,
              name: user.name,
              email: user.email,
              token,
              role: user.role,
            };

          return null;
        } catch (error) {
          console.error(error);

          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const userData = user as User & { token: string; role: string };

      if (userData) {
        token.id = userData.id;
        token.email = userData.email;
        token.name = userData.name;
        token.token = userData.token;
        token.role = userData.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (!token) return session;

      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        token: token.token as string,
        role: token.role as string,
      };

      return session;
    },
  },
};
