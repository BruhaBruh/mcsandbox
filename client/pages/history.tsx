import {
  Icon24ClockOutline,
  Icon24CubeBoxOutline,
  Icon24ServicesOutline,
  Icon28BombOutline,
  Icon28CancelCircleOutline,
  Icon28CheckCircleOutline,
  Icon28WorkOutline,
} from "@vkontakte/icons";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import toast from "react-hot-toast";
import ScrollContainer from "react-indiana-drag-scroll";
import Button from "../components/button";
import LinearLoading from "../components/loading/linear";
import OrderList from "../components/order/list";
import Paper from "../components/paper";
import ToggleButtonList from "../components/togglebuttonlist";
import {
  Order,
  OrderFilterInput,
  OrderStatus,
  ProductType,
  useOrderHistoryQuery,
} from "../generated/graphql";
import isEqual from "../helpers/isEqual";

const History: NextPage = () => {
  const [filterType, setFilterType] = React.useState<ProductType | undefined>(
    undefined
  );
  const [filterStatus, setFilterStatus] = React.useState<
    OrderStatus | undefined
  >(undefined);
  const [where, setWhere] = React.useState<OrderFilterInput>();
  const { data, loading, error, fetchMore } = useOrderHistoryQuery({
    fetchPolicy: "network-only",
    variables: {
      after: null,
      where: where,
    },
  });

  React.useEffect(() => {
    let w: OrderFilterInput = {};
    if (filterType) {
      w = { ...w, product: { type: { eq: filterType } } };
    }
    if (filterStatus) {
      w = { ...w, status: { eq: filterStatus } };
    }
    if (isEqual(w, {})) return setWhere(undefined);
    setWhere(w);
  }, [setWhere, filterType, filterStatus]);

  React.useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  return (
    <div className="space-y-4">
      <Head>
        <title>Песочница › История заказов</title>
      </Head>

      <Paper>
        <ScrollContainer
          vertical={false}
          className="flex items-center justify-between space-x-4"
        >
          <ToggleButtonList
            values={[
              {
                value: undefined,
                label: "Все",
              },
              {
                value: ProductType.Product,
                label: "Товары",
                icon: <Icon24CubeBoxOutline className="text-sky-500 i-20" />,
                activeColor: "info",
              },
              {
                value: ProductType.Service,
                label: "Услуги",
                icon: (
                  <Icon24ServicesOutline className="text-orange-500 i-20" />
                ),
                activeColor: "accent",
              },
            ]}
            renderToggleButton={(s, h) => (
              <Button
                variant={"text"}
                key={s.value}
                color={s.activeColor}
                onClick={h}
                className="space-x-1"
              >
                <span>{s.label ?? s.value}</span>
                {s.icon}
              </Button>
            )}
            onChangeValue={(v) => setFilterType(v as any)}
          />
          <ToggleButtonList
            values={[
              {
                value: undefined,
                label: "Все",
              },
              {
                value: OrderStatus.IsConsidered,
                label: "Ожидание",
                icon: <Icon24ClockOutline className="text-sky-500 i-20" />,
                activeColor: "info",
              },
              {
                value: OrderStatus.InProgress,
                label: "Выполняется",
                icon: <Icon28WorkOutline className="text-neutral-400 i-20" />,
              },
              {
                value: OrderStatus.Success,
                label: "Выполнен",
                icon: (
                  <Icon28CheckCircleOutline className="text-green-500 i-20" />
                ),
                activeColor: "success",
              },
              {
                value: OrderStatus.Rejected,
                label: "Отменен",
                icon: (
                  <Icon28CancelCircleOutline className="text-orange-500 i-20" />
                ),
                activeColor: "accent",
              },
              {
                value: OrderStatus.Expired,
                label: "Просрочен",
                icon: <Icon28BombOutline className="text-red-500 i-20" />,
                activeColor: "error",
              },
            ]}
            renderToggleButton={(s, h) => (
              <Button
                variant={"text"}
                key={s.value}
                color={s.activeColor}
                onClick={h}
                className="space-x-1"
              >
                <span>{s.label ?? s.value}</span>
                {s.icon}
              </Button>
            )}
            onChangeValue={(v) => setFilterStatus(v as any)}
          />
        </ScrollContainer>
      </Paper>

      <OrderList orders={data?.orders?.edges?.map((e) => e.node) as Order[]} />

      {loading && <LinearLoading className="w-full" />}

      {data?.orders?.pageInfo.hasNextPage && (
        <div className="mx-auto">
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.orders?.pageInfo.endCursor,
                  where: where,
                },
              })
            }
            variant="outlined"
            color="info"
            size="medium"
            className="mx-auto"
          >
            Загрузить ещё
          </Button>
        </div>
      )}
    </div>
  );
};

export default History;
