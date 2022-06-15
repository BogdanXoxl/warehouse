import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Role, Prisma } from "@prisma/client";

import prisma from "../../../src/lib/prisma";

const NewTimeNote = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (req.method !== "POST" || !session?.user || session.user.role !== Role.USER)
      throw new Error("Method not allowed");

    const timeNote = await prisma.timeTable.findUnique({
      where: {
        id: session.user.currentNoteId,
      },
    });

    if (!timeNote) {
      throw new Error("Расписание не найдено!");
    }

    const goods = await prisma.good
      .findMany({
        where: {
          id: {
            in: req.body.map((g: Prisma.GoodsInOrdersCreateManyOrderInput) => g.goodId),
          },
        },
      })
      .then((g) =>
        g.map((good) => {
          const good_in_order = req.body.find(
            (o_good: Prisma.GoodsInOrdersCreateManyOrderInput) => o_good.goodId === good.id
          );

          return {
            ...good,
            order_amount: good_in_order.amount | 0,
          };
        })
      );

    if (!goods.length) {
      throw new Error("Товары не найдены!");
    }

    for (const g of goods) {
      await prisma.good.update({
        where: {
          id: g.id,
        },
        data: {
          amount: g.amount - g.order_amount,
        },
      });
    }

    const data: Prisma.OrderCreateInput = {
      summary: goods.reduce((prev, cur) => cur.order_amount * cur.price + prev, 0),
      timeNote: {
        connect: {
          id: timeNote.id,
        },
      },
      GoodsInOrders: {
        createMany: {
          data: req.body.map((g: Prisma.GoodsInOrdersCreateManyOrderInput) => ({
            goodId: g.goodId,
            amount: g.amount,
          })),
        },
      },
    };

    console.log("req>> ", req.body, "data>> ");
    console.dir(data, { depth: Infinity });

    await prisma.order.create({ data });

    res.status(201).json("");
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ statusCode: 500, message: err.message || "Что-то пошло не так!" });
  }
};

export default NewTimeNote;
