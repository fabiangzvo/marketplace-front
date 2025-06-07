import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

          const res = await fetch("http://localhost:4000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await res.json();

          if (!res.ok && data.error) throw data;

          if (data && data.user)
            return {
              id: data.user.sub,
              name: data.user.name,
              email: data.user.email,
              token: data.access_token,
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
      const userData = user as User & { token: string };

      if (userData) {
        token.id = userData.id;
        token.email = userData.email;
        token.name = userData.name;
        token.token = userData.token;
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
      };

      return session;
    },
  },
};
