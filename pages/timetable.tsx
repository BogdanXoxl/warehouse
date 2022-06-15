import { useMutation, useQuery, useQueryClient } from "react-query";
import { SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";
import Grid from "@mui/material/Grid";

import Layout from "../src/components/Layout";
import NewTimeNoteForm, { InputsType } from "../src/components/Forms/NewTimeNoteForm";
import TimeTableList from "../src/components/TimeTableList";

import { USE_QUERY_CONSTS } from "../src/settings";
import TimeTableService from "../src/utils/services/timetable.service";
import { openSNotification, openWNotification } from "../src/utils/notification";

export default function TimeTable() {
  const { data: session } = useSession();
  const u_role = session?.user.role;

  const queryClient = useQueryClient();

  const { data } = useQuery(USE_QUERY_CONSTS.TIMETABLE, TimeTableService.getTimeNotes, {
    initialData: [],
  });

  const { mutate, isLoading } = useMutation(TimeTableService.createTimeNote, {
    onSuccess: async () => {
      queryClient.invalidateQueries(USE_QUERY_CONSTS.TIMETABLE);
      openSNotification();
    },
    onError: (error: any) => openWNotification(error.response.data.message),
  });

  const onSubmit =
    (onSuccess: any): SubmitHandler<InputsType> =>
    (_data) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mutate(_data, { onSuccess });

  return (
    <Layout>
      {u_role === Role.ADMIN ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
            <NewTimeNoteForm {...{ onSubmit, isLoading }} />
          </Grid>
          <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            <TimeTableList {...{ data }} />
          </Grid>
        </Grid>
      ) : (
        <TimeTableList {...{ data }} />
      )}
    </Layout>
  );
}
