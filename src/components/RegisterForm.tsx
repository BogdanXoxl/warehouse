import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Role } from "@prisma/client";
import moment, { Moment } from "moment";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { DatePicker, LoadingButton } from "@mui/lab";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormHelperText from "@mui/material/FormHelperText";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import UserService from "../utils/services/user.service";
import { DATE_FORMAT, USE_QUERY_CONSTS } from "../settings";
import { openSNotification, openWNotification } from "../utils/notification";
import schema from "../validators/refistration.validator";

type InputsType = {
  email: string;
  name: string;
  carierStart: string;
  surname: string;
  password: string;
  isAdmin: boolean;
};

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = useMutation(UserService.createUser, {
    onSuccess: async () => {
      queryClient.invalidateQueries(USE_QUERY_CONSTS.USERS);
      reset();
      openSNotification();
    },
    onError: (error: any) => openWNotification(error.response.data.message),
  });

  const onSubmit: SubmitHandler<InputsType> = (data) =>
    mutate({
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      carierStart: data.carierStart,
      role: data.isAdmin ? Role.ADMIN : Role.USER,
    });

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
                  renderInput={(params) => (
                    <TextField
                      id="carierStart"
                      {...params}
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth required error={!!errors?.password}>
              <InputLabel htmlFor="password">Пароль</InputLabel>
              <OutlinedInput
                {...register("password")}
                id="password"
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText id="component-error-text">
                {errors?.password ? errors?.password?.message : null}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox {...register("isAdmin")} />}
              label="Администратор"
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
