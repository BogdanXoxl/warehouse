import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Role } from "@prisma/client";
import moment from "moment";

import prisma from "../../../src/lib/prisma";
import { DATE_FORMAT } from "../../../src/settings";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (req.method !== "GET" || !session?.user) throw new Error("Method not allowed");

    let response;

    switch (session.user.role) {
      case Role.USER:
        response = await prisma.order.findMany({
          where: {
            timeNote: {
              employeeId: {
                equals: session.user.id,
              },
            },
          },
          include: {
            GoodsInOrders: {
              include: {
                good: true,
              },
            },
            timeNote: {
              include: {
                employee: true,
              },
            },
          },
        });
        break;
      case Role.ADMIN:
        response = await prisma.order.findMany({
          include: {
            GoodsInOrders: {
              include: {
                good: true,
              },
            },
            timeNote: {
              include: {
                employee: true,
              },
            },
          },
        });
        break;
      default:
        throw new Error("Not allowed!");
    }

    const data = response.map((u) => ({
      id: u.id,
      date: moment(u.date).format(DATE_FORMAT),
      summary: u.summary,
      employee: u.timeNote.employee,
      goods: u.GoodsInOrders.map((o) => ({
        good: o.good,
        amount: o.amount,
      })),
    }));

    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default register;
