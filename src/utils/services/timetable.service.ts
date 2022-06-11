import { Prisma } from "@prisma/client";
import axios from "axios";
import { TimeTableWithEmployee } from "../../../types/query-types";

const TimeTableService = {
  async createTimeNote(v: Prisma.TimeTableUncheckedCreateInput) {
    return (await axios.post("/api/timetable/new", v)).data;
  },

  async getTimeNotes() {
    return (await axios.get<TimeTableWithEmployee[]>("/api/timetable")).data;
  },
};

export default TimeTableService;
