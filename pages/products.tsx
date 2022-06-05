import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { SubmitHandler } from "react-hook-form";
import Grid from "@mui/material/Grid";

import Layout from "../src/components/Layout";
import NewProduct, { InputsType } from "../src/components/Forms/NewProductForm";
import ProductList from "../src/components/ProductList";

import { USE_QUERY_CONSTS } from "../src/settings";
import ProductService from "../src/utils/services/product.service";
import { openSNotification, openWNotification } from "../src/utils/notification";

export default function SignUp() {
  const [page, setPage] = useState<number>(0);
  const queryClient = useQueryClient();

  const { data } = useQuery([USE_QUERY_CONSTS.GOODS, page], ProductService.getProducts, {
    initialData: [],
  });

  const { mutate, isLoading } = useMutation(ProductService.createProduct, {
    onSuccess: async () => {
      queryClient.invalidateQueries(USE_QUERY_CONSTS.GOODS);
      openSNotification();
    },
    onError: (error: any) => openWNotification(error.response.data.message),
  });

  const onSubmit =
    (onSuccess: any): SubmitHandler<InputsType> =>
    (_data) =>
      mutate(
        {
          name: _data.name,
          description: _data.description,
          amount: _data.amount,
          price: _data.price,
        },
        { onSuccess }
      );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <NewProduct {...{ onSubmit, isLoading }} />
        </Grid>
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          <ProductList {...{ data, page, handleChangePage }} />
        </Grid>
      </Grid>
    </Layout>
  );
}

// TODO:: add "change amount"
