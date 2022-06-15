import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../../src/lib/prisma";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (req.method !== "GET" || !session?.user) {
      throw new Error("Method not allowed");
    }

    const data = (
      await prisma.good.findMany({
        include: {
          author: true,
        },
        orderBy: {
          amount: "desc",
        },
        ...(req.query.search && {
          where: {
            OR: [
              {
                name: {
                  contains: req.query.search as string,
                },
              },
              {
                description: {
                  contains: req.query.search as string,
                },
              },
            ],
          },
        }),
      })
    ).map((u) => ({
      id: u.id,
      name: u.name,
      amount: u.amount,
      description: u.description,
      author: u.author,
      price: u.price,
    }));

    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default register;
