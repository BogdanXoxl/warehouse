import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Role, Prisma } from "@prisma/client";

import prisma from "../../../src/lib/prisma";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (req.method !== "POST" || !session?.user || session.user.role !== Role.ADMIN)
      throw new Error("Method not allowed");

    const data: Prisma.GoodCreateInput = {
      name: req.body.name,
      description: req.body.description,
      amount: req.body.amount,
      author: {
        connect: {
          id: session.user?.id,
        },
      },
    };

    console.dir([data, req.body], { depth: Infinity });

    await prisma.good.create({
      data,
    });

    res.status(200).json("");
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ statusCode: 500, message: "Something went wrong!" });
  }
};

export default register;
