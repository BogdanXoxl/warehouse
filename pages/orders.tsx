import { useQuery } from "react-query";

import Layout from "../src/components/Layout";
import OrderList from "../src/components/OrderList";

import { USE_QUERY_CONSTS } from "../src/settings";
import OrderService from "../src/utils/services/order.service";

export default function Orders() {
  const { data } = useQuery(USE_QUERY_CONSTS.USERS, OrderService.getOrders, {
    initialData: [],
  });

  return (
    <Layout>
      <OrderList {...{ data }} />
    </Layout>
  );
}
