import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: Partial<User>;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: Partial<User>;
  }
}
