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

export type OrderListRequest = {
  orders: OrderWithEmployee[];
  month_profit: number;
};

export type TimeTableWithEmployee = {
  id: string;
  start: string;
  end: string;
  executed: boolean;
  employee: Pick<User, "name" | "surname">;
  orders: OrderWithEmployee[];
};
