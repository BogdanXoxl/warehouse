import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Role, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import moment from "moment";
import nodemailer from "nodemailer";

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
      ...(req.body.carierStart && {
        carierStart: moment(req.body.carierStart, DATE_FORMAT).toDate(),
      }),
      role: req.body.role,
    };

    console.log("req>> ", req.body, "data>> ", data);

    const user = await prisma.user.upsert({
      where: {
        email: data.email ?? "",
      },
      update: { ...data },
      create: { ...data },
    });

    if (user.emailVerified) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: "Подтверждение почты для WH",
        to: user.email ?? undefined,
        subject: "Hello ✔",
        text: `Hello ${user.name}`,
        html: `<a href="https://${req.headers.host}/api/users/email_verified/${user.emailVerified}">Подтвердить</a> почту`,
      });

      console.log("Message sent to ", info);
    }

    res.status(201).json("");
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ statusCode: 500, message: "Something went wrong!" });
  }
};

export default register;
