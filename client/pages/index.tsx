import { Icon24CubeBoxOutline, Icon24ServicesOutline } from "@vkontakte/icons";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import toast from "react-hot-toast";
import Button from "../components/button";
import LinearLoading from "../components/loading/linear";
import Paper from "../components/paper";
import ProductList from "../components/product/list";
import ToggleButtonList from "../components/togglebuttonlist";
import {
  Product,
  ProductFilterInput,
  ProductType,
  SortEnumType,
  useProductsQuery,
} from "../generated/graphql";

const Home: NextPage = () => {
  const [filterType, setFilterType] = React.useState<ProductType | undefined>(
    undefined
  );
  const [where, setWhere] = React.useState<ProductFilterInput>();
  const { data, error, loading, fetchMore } = useProductsQuery({
    fetchPolicy: "network-only",
    variables: {
      where: where,
      after: null,
      order: [{ productId: SortEnumType.Asc }],
    },
  });

  React.useEffect(() => {
    if (!filterType) return setWhere(undefined);
    if (filterType === ProductType.Product) {
      return setWhere({ type: { eq: ProductType.Product } });
    }
    return setWhere({ type: { eq: ProductType.Service } });
  }, [filterType]);

  React.useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  return (
    <div className="space-y-4">
      <Head>
        <title>Песочница › Товары</title>
      </Head>

      <Paper>
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
              icon: <Icon24ServicesOutline className="text-orange-500 i-20" />,
              activeColor: "accent",
            },
          ]}
          renderToggleButton={(s, h) => (
            <Button
              variant={"text"}
              color={s.activeColor}
              onClick={h}
              className="space-x-1"
              key={s.value}
            >
              <span>{s.label ?? s.value}</span>
              {s.icon}
            </Button>
          )}
          onChangeValue={(v) => setFilterType(v as any)}
        />
      </Paper>

      <ProductList
        products={data?.products?.edges?.map((e) => e.node) as Product[]}
      />

      {loading && <LinearLoading className="col-span-full" />}

      {data?.products?.pageInfo.hasNextPage && (
        <div className="col-span-full">
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.products?.pageInfo.endCursor,
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

export default Home;
