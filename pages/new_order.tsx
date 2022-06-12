import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Grid from "@mui/material/Grid";

import cartStore from "../src/lib/store";
import Layout from "../src/components/Layout";
import NewOrderProductList from "../src/components/NewOrderProductList";
import NewOrderForm from "../src/components/Forms/NewOrderForm";

import { USE_QUERY_CONSTS } from "../src/settings";
import { openSNotification, openWNotification } from "../src/utils/notification";
import ProductService from "../src/utils/services/product.service";
import OrderService from "../src/utils/services/order.service";

export default function TimeTable() {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data } = useQuery(
    [USE_QUERY_CONSTS.GOODS, searchValue],
    () => ProductService.getProducts(searchValue),
    {
      initialData: [],
      keepPreviousData: true,
    }
  );

  const { mutate, isLoading } = useMutation(OrderService.createOrder, {
    onSuccess: async () => {
      queryClient.invalidateQueries();
      openSNotification();
      cartStore.clear();
    },
    onError: (error: any) => openWNotification(error.response.data.message),
  });

  const onSubmit = () =>
    mutate(
      cartStore.goods.map((g) => ({
        goodId: g.id,
        amount: g.count,
      }))
    );

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <NewOrderForm {...{ onSubmit, isLoading }} />
        </Grid>
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          <NewOrderProductList {...{ data, onSearch: (v: string | null) => setSearchValue(v) }} />
        </Grid>
      </Grid>
    </Layout>
  );
}
