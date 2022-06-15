import { Typography } from "@mui/material";
import { useQuery } from "react-query";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import Layout from "../src/components/Layout";
import OrderList from "../src/components/OrderList";

import { USE_QUERY_CONSTS } from "../src/settings";
import OrderService from "../src/utils/services/order.service";

export default function Orders() {
  const { data } = useQuery(USE_QUERY_CONSTS.ORDERS, OrderService.getOrders, {
    initialData: {
      orders: [],
      month_profit: 0,
    },
  });

  return (
    <Layout>
      <Stack direction="row" gap={3}>
        <Typography component="div">
          Выручка за текущий месяц: <Chip label={`${data?.month_profit} ₽`} />
        </Typography>
      </Stack>
      <OrderList data={data?.orders} />
    </Layout>
  );
}
