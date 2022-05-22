import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
// import confirmPasswordHash from "../../../src/utils/confirmPasswordHash";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
            },
          });

          if (user !== null) {
            // if (confirmPasswordHash(credentials?.password, user.password))
            if (user.emailVerified)
              return {
                emai: user.email,
                name: user.name,
                image: user.image,
              };
            else throw new Error("Email is not verified!");
          }
          throw new Error("something went wrong");
        } catch (err) {
          console.log("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
});
