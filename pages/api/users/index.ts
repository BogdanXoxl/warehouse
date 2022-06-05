import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Role } from "@prisma/client";
import moment from "moment";

import prisma from "../../../src/lib/prisma";
import { DATE_FORMAT } from "../../../src/settings";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (req.method !== "GET" || !session?.user || session.user.role !== Role.ADMIN)
      throw new Error("Method not allowed");

    const data = (await prisma.user.findMany()).map((u) => ({
      id: u.id,
      name: u.name,
      surname: u.surname,
      email: u.email,
      carierStart: moment(u.carierStart).format(DATE_FORMAT),
      role: u.role,
      emailVerified: u.emailVerified && moment(u.emailVerified).format(DATE_FORMAT),
    }));

    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default register;
