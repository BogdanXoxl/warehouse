import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DatePicker, LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "react-query";
import UserService from "../utils/services/user.service";
import { DATE_FORMAT, DATE_MASK, USE_QUERY_CONSTS } from "../settings";
import { openSNotification, openWNotification } from "../utils/notification";
import { Role } from "@prisma/client";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import schema from "../validators/refistration.validator";
import { yupResolver } from "@hookform/resolvers/yup";
import moment, { Moment } from "moment";

type InputsType = {
  email: string;
  name: string;
  carierStart: string;
  surname: string;
  password: string;
};

export default function SignUp() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(UserService.createUser, {
    onSuccess: async () => {
      queryClient.invalidateQueries(USE_QUERY_CONSTS.USERS);
      openSNotification();
    },
    onError: (error: any) => openWNotification(error.response.data),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    console.log(data);

    mutate({
      name: "",
      surname: "",
      email: "",
      password: "password",
      role: Role.USER,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Новый пользователь
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              required
              fullWidth
              id="name"
              label="Имя"
              autoFocus
              {...register("name")}
              error={!!errors?.name}
              helperText={errors?.name ? errors?.name?.message : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="surname"
              label="Фамилия"
              autoComplete="family-name"
              {...register("surname")}
              error={!!errors?.surname}
              helperText={errors?.surname ? errors?.surname?.message : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              {...register("email")}
              error={!!errors?.email}
              helperText={errors?.email ? errors?.email?.message : null}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="carierStart"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  onChange={(date?: Moment | null) => onChange(date?.format(DATE_FORMAT) ?? null)}
                  value={moment(value, DATE_FORMAT)}
                  label="Дата начала карьеры"
                  mask={DATE_MASK}
                  renderInput={(params) => (
                    <TextField
                      id="carierStart"
                      error={!!error}
                      helperText={error?.message}
                      {...params}
                      fullWidth
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Пароль"
              type="password"
              id="password"
              autoComplete="new-password"
              {...register("password")}
              error={!!errors?.password}
              helperText={errors?.password ? errors?.password?.message : null}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isLoading}
        >
          Добавить
        </LoadingButton>
      </Box>
    </Box>
  );
}
