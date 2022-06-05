import { Prisma } from "@prisma/client";

export type GoodsWithAuthor = Prisma.GoodGetPayload<{
  include: {
    author: true;
  };
}>;
