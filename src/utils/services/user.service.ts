import axios from "axios";
import { Prisma, Role, User } from "@prisma/client";

const UserService = {
  async createUser(v: Prisma.UserCreateInput) {
    return (await axios.post("/api/users/new", v)).data;
  },

  async getUsers() {
    return (await axios.get<(User & { carierStart: string })[]>("/api/users")).data;
  },

  async getAllEmployees() {
    return (
      await axios.get<(User & { carierStart: string })[]>("/api/users", {
        params: { role: Role.USER },
      })
    ).data;
  },
};

export default UserService;
