import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../src/lib/prisma";
import confirmPasswordHash from "../../../src/utils/confirmPasswordHash";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        console.log("auth>> ", credentials);
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (user !== null) {
            if (confirmPasswordHash(credentials?.password, user.password))
              if (user.emailVerified)
                return {
                  emai: user.email,
                  name: user.name,
                  role: user.role,
                  surname: user.surname,
                  carier_start: user.carierStart,
                };
              else throw new Error("Email is not verified!");
          }
          throw new Error("Something went wrong");
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
