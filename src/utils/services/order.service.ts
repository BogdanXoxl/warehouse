// import { Prisma } from "@prisma/client";
import axios from "axios";
import { OrderWithEmployee } from "../../../types/query-types";

const OrderService = {
  // async createProduct(v: Omit<Prisma.GoodCreateInput, "author">) {
  //   return (await axios.post("/api/products/new", v)).data;
  // },

  async getOrders() {
    return (await axios.get<OrderWithEmployee[]>("/api/orders")).data;
  },
};

export default OrderService;
