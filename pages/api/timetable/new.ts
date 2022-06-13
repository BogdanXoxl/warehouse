import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Role, Prisma } from "@prisma/client";

import prisma from "../../../src/lib/prisma";
import moment from "moment";

const NewTimeNote = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (req.method !== "POST" || !session?.user || session.user.role !== Role.ADMIN)
      throw new Error("Method not allowed");

    const check_timetable = await prisma.timeTable.findFirst({
      where: {
        OR: [
          req.body.start && {
            start: {
              gte: moment(req.body.start).toDate(),
              lte: moment(req.body.end).toDate(),
            },
          },
          req.body.end && {
            end: {
              gte: moment(req.body.start).toDate(),
              lte: moment(req.body.end).toDate(),
            },
          },
        ],
      },
    });

    console.log(">>", check_timetable);

    if (check_timetable) {
      throw new Error("Time note already exist!");
    }

    if (moment(req.body.end).isSameOrBefore(moment(req.body.start))) {
      //TODO:: don't work
      throw new Error("Time note is incorrect!");
    }

    const data: Prisma.TimeTableCreateInput = {
      ...(req.body.start && {
        start: moment(req.body.start).toDate(),
      }),
      ...(req.body.end && {
        end: moment(req.body.end).toDate(),
      }),
      employee: {
        connect: {
          id: req.body.employeeId,
        },
      },
    };

    console.log("req>> ", req.body, "data>> ", data);

    await prisma.timeTable.create({ data });

    res.status(201).json("");
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ statusCode: 500, message: "Something went wrong!" });
  }
};

export default NewTimeNote;
