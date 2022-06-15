import { Prisma } from "@prisma/client";
import axios from "axios";
import { GoodsWithAuthor } from "../../../types/query-types";

const ProductService = {
  async createProduct(v: Omit<Prisma.GoodCreateInput, "author">) {
    return (await axios.post("/api/products/new", v)).data;
  },

  async getProducts(searchValue?: string | null) {
    return (
      await axios.get<GoodsWithAuthor[]>("/api/products", { params: { search: searchValue } })
    ).data;
  },
};

export default ProductService;
