import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Role, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import moment from "moment";

import prisma from "../../../src/lib/prisma";
import { DATE_FORMAT } from "../../../src/settings";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (req.method !== "POST" || !session?.user || session.user.role !== Role.ADMIN)
      throw new Error("Method not allowed");

    const data: Prisma.UserCreateInput = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 8),
      carierStart: req.body.carierStart
        ? moment(req.body.carierStart, DATE_FORMAT).toDate()
        : undefined,
      role: req.body.role,
    };

    console.dir([data, req.body], { depth: Infinity });

    await prisma.user.create({
      data,
    });

    res.status(200).json("");
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ statusCode: 500, message: "Something went wrong!" });
  }
};

export default register;
