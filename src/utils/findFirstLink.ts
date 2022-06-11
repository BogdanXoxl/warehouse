import { Role } from "@prisma/client";
import { LinkType } from "../../types/setting-types";

export default function findFirstLink(role?: Role, links: LinkType[] = []) {
  if (role)
    for (const link of links) {
      if (link.roles.includes(role)) {
        return link;
      }
    }
  throw new Error(`List not contains any link with ${role} role`);
}
