import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import toast from "react-hot-toast";
import { AdminPages } from "..";
import Button from "../../../components/button";
import LinearLoading from "../../../components/loading/linear";
import Paper from "../../../components/paper";
import ToggleButtonList from "../../../components/togglebuttonlist";
import AdminList from "../../../components/user/adminlist";
import { useGetUsersQuery, User } from "../../../generated/graphql";
import useIsAdmin from "../../../hooks/useIsAdmin";

const AdminUsers: NextPage = () => {
  const _ = useIsAdmin("/");
  const { data, error, loading, fetchMore } = useGetUsersQuery({
    variables: {
      after: null,
    },
  });

  React.useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  return (
    <div className="space-y-4">
      <Head>
        <title>[A] Песочница › Пользователи</title>
      </Head>
      <Paper>
        <ToggleButtonList
          defaultCurrentValue={AdminPages.Users}
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

      <AdminList
        users={(data?.users?.edges?.map((e) => e.node) as User[]) ?? []}
      />

      {loading && <LinearLoading className="col-span-full" />}

      {data?.users?.pageInfo?.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({ variables: { after: data.users?.pageInfo.endCursor } })
          }
          variant="outlined"
          color="info"
          size="medium"
          className="mx-auto"
        >
          Загрузить ещё
        </Button>
      )}
    </div>
  );
};

export default AdminUsers;
