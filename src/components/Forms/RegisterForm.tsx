import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Role } from "@prisma/client";
import moment from "moment";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
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

import UserService from "../../utils/services/user.service";
import { DATE_FORMAT, USE_QUERY_CONSTS } from "../../settings";
import { openSNotification, openWNotification } from "../../utils/notification";
import schema from "../../validators/registration.validator";

type InputsType = {
  email: string;
  name: string;
  carierStart: string | null;
  surname: string;
  password: string;
  isAdmin: boolean;
};

export default function RegisterForm() {
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
      carierStart: data.carierStart ? moment(data.carierStart).format(DATE_FORMAT) : undefined,
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
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3, width: "100%" }}
      >
        <Stack spacing={2}>
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
          <Controller
            control={control}
            name="carierStart"
            defaultValue={null}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label="Дата начала карьеры"
                value={value}
                onChange={(_value) => onChange(_value && moment(_value).format())}
                renderInput={(params) => (
                  <TextField
                    id="carierStart"
                    autoComplete="off"
                    {...params}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
            )}
          />
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
          <FormControlLabel
            label="Администратор"
            control={
              <Controller
                name="isAdmin"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <Checkbox {...field} checked={!!value} />
                )}
              />
            }
          />
        </Stack>
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
