import { Prisma } from "@prisma/client";
import axios from "axios";
import { GoodsWithAuthor } from "../../../types/query-types";

const ProductService = {
  async createProduct(v: Omit<Prisma.GoodCreateInput, "author">) {
    return (await axios.post("/api/products/new", v)).data;
  },

  async getProducts() {
    return (await axios.get<GoodsWithAuthor[]>("/api/products")).data;
  },
};

export default ProductService;
