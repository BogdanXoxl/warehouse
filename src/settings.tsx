import { Role } from "@prisma/client";
import { LinkType } from "../types/setting-types";

export const Links: LinkType[] = [
  {
    to: "/new_order",
    title: "Новый заказ",
    roles: [Role.USER],
  },
  {
    to: "/orders",
    title: "Список заказов",
    roles: [Role.ADMIN, Role.USER],
  },
  {
    to: "/timetable",
    title: "Список смен",
    roles: [Role.ADMIN, Role.USER],
  },
  {
    to: "/users",
    title: "Список сотрудников",
    roles: [Role.ADMIN],
  },
  {
    to: "/products",
    title: "Список товаров",
    roles: [Role.ADMIN],
  },
];

export const USE_QUERY_CONSTS = {
  GOODS: "GOODS",
  TIMETABLE: "TIMETABLE",
  USERS: "USERS",
  ORDERS: "ORDERS",
};

export const OPEN_URLS = ["img"];

export const DATE_FORMAT = "DD.MM.YYYY";
export const DATE_TIME_FORMAT = "DD.MM.YYYY HH:mm";
