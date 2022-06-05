import { useState } from "react";
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid";

import Layout from "../src/components/Layout";
import RegisterForm from "../src/components/Forms/RegisterForm";
import UserList from "../src/components/UserList";

import { USE_QUERY_CONSTS } from "../src/settings";
import UserService from "../src/utils/services/user.service";

export default function SignUp() {
  const [page, setPage] = useState<number>(0);
  const { data } = useQuery([USE_QUERY_CONSTS.USERS, page], UserService.getUsers, {
    initialData: [],
  });

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <RegisterForm />
        </Grid>
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          <UserList {...{ data, page, handleChangePage }} />
        </Grid>
      </Grid>
    </Layout>
  );
}

//TODO:: move all data functions from components to page
