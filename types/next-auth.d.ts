import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: Partial<User & { currentNoteId: string }>;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: Partial<User>;
  }
}
