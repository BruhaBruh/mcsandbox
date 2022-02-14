import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Button from "../../components/button";
import Paper from "../../components/paper";
import ToggleButtonList from "../../components/togglebuttonlist";
import useIsAdmin from "../../hooks/useIsAdmin";

export enum AdminPages {
  Products = "/admin/products",
  Orders = "/admin/orders",
  Users = "/admin/users",
}

const AdminPage: NextPage = () => {
  const _ = useIsAdmin("/");

  return (
    <div className="space-y-4">
      <Head>
        <title>[A] Песочница</title>
      </Head>
      <Paper>
        <ToggleButtonList
          values={[
            {
              value: AdminPages.Products,
              label: "Товары",
            },
            {
              value: AdminPages.Orders,
              label: "Заказы",
            },
            {
              value: AdminPages.Users,
              label: "Пользователи",
            },
          ]}
          renderToggleButton={(s, h) => (
            <Button
              variant={"text"}
              color={s.activeColor}
              onClick={h}
              className="space-x-1"
              to={s.value?.toString()}
              key={s.value}
            >
              <span>{s.label ?? s.value}</span>
            </Button>
          )}
        />
      </Paper>
    </div>
  );
};

export default AdminPage;
