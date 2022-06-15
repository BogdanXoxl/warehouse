import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Role, Prisma } from "@prisma/client";

import prisma from "../../../src/lib/prisma";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (req.method !== "POST" || !session?.user || session.user.role !== Role.ADMIN)
      throw new Error("Method not allowed");

    const product = await prisma.good.findFirst({
      where: {
        authorId: session.user.id,
        name: req.body.name,
      },
    });

    if (product) {
      throw new Error("Продукт уже существует!");
    }

    const data: Prisma.GoodCreateInput = {
      name: req.body.name,
      description: req.body.description,
      amount: req.body.amount,
      price: req.body.price,
      author: {
        connect: {
          id: session.user?.id,
        },
      },
    };

    console.log("req>> ", req.body, "data>> ", data);

    await prisma.good.create({ data });

    res.status(201).json("");
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ statusCode: 500, message: err.message ?? "Что-то пошло не так!" });
  }
};

export default register;
