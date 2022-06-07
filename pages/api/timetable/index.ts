import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Role } from "@prisma/client";
import moment from "moment";

import prisma from "../../../src/lib/prisma";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../../../src/settings";
import { TimeTableWithEmployee } from "../../../types/query-types";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (req.method !== "GET" || !session?.user) throw new Error("Method not allowed");

    let response;

    switch (session.user.role) {
      case Role.USER:
        response = await prisma.timeTable.findMany({
          orderBy: {
            start: "asc",
          },
          where: {
            start: {
              gte: new Date(),
            },
          },
          include: {
            employee: true,
            Order: {
              orderBy: {
                date: "desc",
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
            },
          },
        });
        break;
      case Role.ADMIN:
        response = await prisma.timeTable.findMany({
          orderBy: {
            start: "desc",
          },
          include: {
            employee: true,
            Order: {
              orderBy: {
                date: "desc",
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
            },
          },
        });
        break;
      default:
        throw new Error("Not allowed!");
    }

    const data: TimeTableWithEmployee[] = response.map((u) => ({
      id: u.id,
      start: moment(u.start).format(DATE_TIME_FORMAT),
      end: moment(u.end).format(DATE_TIME_FORMAT),
      executed: u.executed,
      orders: u.Order.map((o) => ({
        id: o.id,
        date: moment(o.date).format(DATE_FORMAT),
        summary: o.summary,
        employee: o.timeNote.employee,
        goods: o.GoodsInOrders.map((g) => ({
          good: g.good,
          amount: g.amount,
        })),
      })),
      employee: {
        name: u.employee.name,
        surname: u.employee.surname,
      },
    }));

    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default register;
