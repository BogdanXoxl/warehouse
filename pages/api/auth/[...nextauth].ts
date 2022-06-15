import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Role, User } from "@prisma/client";
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
            if (await confirmPasswordHash(credentials?.password, user.password))
              if (!user.emailVerified) {
                const data: Partial<User & { currentNoteId: string }> = {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  role: user.role,
                  surname: user.surname,
                  carierStart: user.carierStart,
                  currentNoteId: undefined,
                };

                if (user.role === Role.USER) {
                  let note = await prisma.timeTable.findFirst({
                    where: {
                      employeeId: user.id,
                      start: {
                        lte: new Date(),
                      },
                      end: {
                        gt: new Date(),
                      },
                    },
                  });

                  if (!note) {
                    throw new Error("No current work");
                  }

                  note = await prisma.timeTable.update({
                    where: {
                      id: note.id,
                    },
                    data: {
                      executed: true,
                    },
                  });

                  data.currentNoteId = note.id;
                }

                return data;
              } else {
                throw new Error("Email is not verified!");
              }
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
