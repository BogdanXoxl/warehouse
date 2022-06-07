import { NextRequest, NextResponse } from "next/server";
import type { JWT } from "next-auth/jwt";

import { withAuth } from "next-auth/middleware";
import { Links, OPEN_URLS } from "../src/settings";
import { Role } from "@prisma/client";
import findFirstLink from "../src/utils/findFirstLink";

export default withAuth(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  (req: NextRequest & { nextauth: { token: JWT } }) => {
    const user = req.nextauth.token?.user;
    const { pathname } = req.nextUrl;

    if (user) {
      if (user.role)
        if (
          !pathname.includes("api") &&
          (!Links.find((l) => pathname.startsWith(l.to))?.roles.includes(user.role) ||
            (pathname.includes("/admin") && user.role !== Role.ADMIN)) &&
          //TODO:: refactor
          pathname !== "/404" &&
          pathname !== "/"
        )
          return NextResponse.redirect(new URL("/404", req.url));

      if (pathname === "/")
        return NextResponse.redirect(new URL(findFirstLink(user.role, Links).to, req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token, req }) =>
        !!token || !!OPEN_URLS.find((u) => req.nextUrl.pathname.includes(u)),
    },
  }
);
