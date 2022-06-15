import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";

import { USE_QUERY_CONSTS } from "../../settings";
import UserService from "../../utils/services/user.service";
import schema from "../../validators/timetable.validator";

export type InputsType = {
  start: string | null;
  end: string | null;
  employeeId: string;
};

type Props = {
  isLoading?: boolean;
  onSubmit: (onSuccess: any) => SubmitHandler<InputsType>;
};

export default function NewTimeNoteForm({ isLoading, onSubmit }: Props) {
  const { data: employees } = useQuery(USE_QUERY_CONSTS.USERS, UserService.getAllEmployees);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: yupResolver(schema),
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
        Новая смена
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit(() => reset()))}
        sx={{ mt: 3, width: "100%" }}
      >
        <Stack spacing={2}>
          <FormControl fullWidth required>
            <InputLabel id="employeeId">Сотрудник</InputLabel>
            <Select
              {...register("employeeId")}
              defaultValue=""
              labelId="employeeId"
              id="employeeId"
              label="Сотрудник"
              autoComplete="off"
              disabled={!employees?.length}
              error={!!errors?.employeeId}
            >
              {employees?.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  {`${u.surname ?? ""} ${u.name}`}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText id="component-error-text">
              {errors?.employeeId ? errors?.employeeId?.message : null}
            </FormHelperText>
          </FormControl>

          <Controller
            control={control}
            name="start"
            defaultValue={null}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DateTimePicker
                label="Начало"
                disablePast
                value={value}
                onChange={(_value) => onChange(_value && moment(_value).format())}
                renderInput={(params) => (
                  <TextField
                    id="start"
                    autoComplete="off"
                    required
                    {...params}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
            )}
          />

          <Controller
            control={control}
            name="end"
            defaultValue={null}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DateTimePicker
                label="Оконачание"
                value={value}
                disablePast
                onChange={(_value) => onChange(_value && moment(_value).format())}
                renderInput={(params) => (
                  <TextField
                    id="end"
                    autoComplete="off"
                    required
                    {...params}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
            )}
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
