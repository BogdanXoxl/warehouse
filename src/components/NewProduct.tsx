import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";

import schema from "../validators/newProduct.validation";

export type InputsType = {
  name: string;
  description?: string;
  amount: number;
};

type Props = {
  isLoading?: boolean;
  onSubmit: (onSuccess: any) => SubmitHandler<InputsType>;
};

export default function NewProduct({ onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputsType>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 0,
    },
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
        Новый продукт
      </Typography>
      <Box
        autoComplete="off"
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit(() => reset()))}
        sx={{ mt: 3, width: "100%" }}
      >
        <Stack spacing={2}>
          <TextField
            required
            fullWidth
            inputProps={{
              maxLength: 50,
            }}
            id="name"
            label="Название"
            autoFocus
            {...register("name")}
            error={!!errors?.name}
            helperText={errors?.name ? errors?.name?.message : null}
          />

          <TextField
            fullWidth
            type="number"
            id="amount"
            label="Количество товара"
            inputProps={{ min: 0 }}
            {...register("amount")}
            error={!!errors?.amount}
            helperText={errors?.amount ? errors?.amount?.message : null}
          />

          <TextField
            id="description"
            label="Описание"
            multiline
            fullWidth
            maxRows={4}
            inputProps={{
              maxLength: 250,
            }}
            {...register("description")}
            error={!!errors?.description}
            helperText={errors?.description ? errors?.description?.message : null}
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
