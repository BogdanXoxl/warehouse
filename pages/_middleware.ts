import { NextRequest, NextResponse } from "next/server";
import type { JWT } from "next-auth/jwt";

import { withAuth } from "next-auth/middleware";
import { Links, OPEN_URLS } from "../src/settings";
import { Role } from "../types/roles";

export default withAuth(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  (req: NextRequest & { nextauth: { token: JWT } }) => {
    console.log(req);
    const user = req.nextauth.token?.user;
    const { pathname } = req.nextUrl;

    if (user) {
      if (user.role)
        if (
          !pathname.includes("api") &&
          (!Links.find((l) => pathname.startsWith(l.to))?.roles.includes(user.role as Role) ||
            (pathname.includes("/admin") && user.role !== Role.ADMIN))
        )
          return NextResponse.redirect(new URL("/", req.url));

      // if (pathname === "/") return NextResponse.redirect(new URL("/profile", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        // console.log(token, req);
        // console.log(OPEN_URLS.find(u => req.nextUrl.pathname.includes(u)), !!OPEN_URLS.find(u => req.nextUrl.pathname.includes(u)), req.url)
        return !!token || !!OPEN_URLS.find((u) => req.nextUrl.pathname.includes(u));
      },
    },
  }
);
