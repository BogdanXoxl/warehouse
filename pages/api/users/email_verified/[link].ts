import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../src/lib/prisma";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const link = req.query.link;

    console.log(link);

    res.redirect(308, "/");
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default register;
