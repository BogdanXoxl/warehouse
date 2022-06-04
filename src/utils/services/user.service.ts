import axios from "axios";
import { Prisma, User } from "@prisma/client";

const UserService = {
  async createUser(v: Prisma.UserCreateInput) {
    return (await axios.post("/api/users/new", v)).data;
  },

  async getUsers(): Promise<(User & { carierStart: string })[]> {
    return (await axios.get("/api/users")).data;
  },
};

export default UserService;
