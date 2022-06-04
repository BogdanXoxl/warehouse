import Grid from "@mui/material/Grid";
import Layout from "../src/components/Layout";
import RegisterForm from "../src/components/RegisterForm";
import UserList from "../src/components/UserList";

export default function SignUp() {
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <RegisterForm />
        </Grid>
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          <UserList />
        </Grid>
      </Grid>
    </Layout>
  );
}
