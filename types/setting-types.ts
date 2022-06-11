import { Role } from "@prisma/client";

export type LinkType = {
  to: string;
  title: string;
  roles: Role[];
};
