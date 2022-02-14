import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import toast from "react-hot-toast";
import { AdminPages } from "..";
import Button from "../../../components/button";
import LinearLoading from "../../../components/loading/linear";
import Paper from "../../../components/paper";
import ProductAddForm from "../../../components/product/addForm";
import AdminProductList from "../../../components/product/adminlist";
import ToggleButtonList from "../../../components/togglebuttonlist";
import {
  Product,
  SortEnumType,
  useProductsQuery,
} from "../../../generated/graphql";
import { useAppDispatch } from "../../../hooks/redux";
import useIsAdmin from "../../../hooks/useIsAdmin";
import { setModal } from "../../../lib/redux/ui/reducer";

const AdminProducts: NextPage = () => {
  const _ = useIsAdmin("/");
  const dispatch = useAppDispatch();
  const { data, error, loading, fetchMore } = useProductsQuery({
    fetchPolicy: "network-only",
    variables: {
      after: null,
      order: [{ productId: SortEnumType.Asc }],
    },
  });

  React.useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  const openAddForm = () => dispatch(setModal(<ProductAddForm />));

  return (
    <div className="space-y-4">
      <Head>
        <title>[A] Песочница › Товары</title>
      </Head>
      <Paper className="flex items-center justify-between space-x-2">
        <ToggleButtonList
          defaultCurrentValue={AdminPages.Products}
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
        <Button variant="outlined" color="success" onClick={openAddForm}>
          Добавить
        </Button>
      </Paper>

      <AdminProductList
        products={
          (data?.products?.edges?.map((e) => e.node) as Product[]) ?? []
        }
      />

      {loading && <LinearLoading className="col-span-full" />}

      {data?.products?.pageInfo.hasNextPage && (
        <div className="col-span-full">
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.products?.pageInfo.endCursor,
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

export default AdminProducts;
