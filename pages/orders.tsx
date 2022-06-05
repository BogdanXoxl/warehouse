import { useState } from "react";
import { useQuery } from "react-query";

import Layout from "../src/components/Layout";
import OrderList from "../src/components/OrderList";

import { USE_QUERY_CONSTS } from "../src/settings";
import OrderService from "../src/utils/services/order.service";

export default function SignUp() {
  const [page, setPage] = useState<number>(0);
  const { data } = useQuery([USE_QUERY_CONSTS.USERS, page], OrderService.getOrders, {
    initialData: [],
  });

  console.log(data);

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  return (
    <Layout>
      <OrderList {...{ data, page, handleChangePage }} />
    </Layout>
  );
}
