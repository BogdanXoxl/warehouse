import { Prisma } from "@prisma/client";
import axios from "axios";
import { OrderListRequest } from "../../../types/query-types";

const OrderService = {
  async createOrder(v: Prisma.GoodsInOrdersCreateManyOrderInput[]) {
    return (await axios.post("/api/orders/new", v)).data;
  },

  async getOrders() {
    return (await axios.get<OrderListRequest>("/api/orders")).data;
  },
};

export default OrderService;
