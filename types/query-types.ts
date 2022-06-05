import { Good, Prisma, User } from "@prisma/client";

export type GoodsWithAuthor = Prisma.GoodGetPayload<{
  include: {
    author: true;
  };
}>;

export type OrderWithEmployee = {
  id: string;
  summary: number;
  date: string;
  goods: {
    amount: number;
    good: Good;
  }[];
  employee: User;
};
