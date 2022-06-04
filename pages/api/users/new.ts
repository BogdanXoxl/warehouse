import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../src/lib/prisma";
import { getSession } from "next-auth/react";
import { Role, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
// import confirmPasswordHash from "../../../src/utils/confirmPasswordHash";

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
      carierStart: req.body.carierStart,
      role: req.body.role,
    };

    console.dir(data, { depth: Infinity });

    // prisma.user.create({
    //   data,
    // });

    res.status(200).json("");
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default register;
