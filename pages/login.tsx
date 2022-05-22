import { GetServerSideProps, NextPage } from "next";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { signIn, getSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import LoginSchema from "../src/validators/login.validator";
import { yupResolver } from "@hookform/resolvers/yup";

type InputsType = {
  email: string;
  password: string;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<InputsType> = (data) => signIn("credentials", data);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={7} component={Paper} elevation={6} square>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, pb: 3 }}
            width="310px"
          >
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              {...register("email")}
              error={!!errors?.email}
              helperText={errors?.email ? errors?.email?.message : null}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
              error={!!errors?.password}
              helperText={errors?.password ? errors?.password?.message : null}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Войти
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={5}
        sx={{
          backgroundImage: "url(img/banners/login_banner.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "primary.main",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};

export default LoginPage;
