import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import toast from "react-hot-toast";
import ScrollContainer from "react-indiana-drag-scroll";
import Button from "../components/button";
import ExecutorsList from "../components/executor/list";
import LinearLoading from "../components/loading/linear";
import Paper from "../components/paper";
import ToggleButtonList from "../components/togglebuttonlist";
import {
  SortEnumType,
  useExecutorsQuery,
  User,
  UserSortInput,
} from "../generated/graphql";

enum ExecutorSort {
  RatingAsc = "RATING_ASC",
  RatingDesc = "RATING_DESC",
}

const ExecutorsPage: NextPage = () => {
  const [order, setOrder] = React.useState<UserSortInput[]>([]);
  const { data, loading, error, fetchMore } = useExecutorsQuery({
    fetchPolicy: "network-only",
    variables: {
      after: null,
      order: order,
    },
  });
  const [sortType, setSortType] = React.useState<ExecutorSort>(
    ExecutorSort.RatingAsc
  );

  React.useEffect(() => {
    if (sortType == ExecutorSort.RatingAsc) {
      setOrder([{ rating: SortEnumType.Asc }]);
    } else {
      setOrder([{ rating: SortEnumType.Desc }]);
    }
  }, [setOrder, sortType]);

  React.useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  return (
    <div className="space-y-4">
      <Head>
        <title>Песочница › Исполнители</title>
      </Head>

      <Paper>
        <ScrollContainer
          vertical={false}
          className="flex items-center justify-between space-x-4"
        >
          <ToggleButtonList
            defaultCurrentValue={ExecutorSort.RatingAsc}
            values={[
              {
                value: ExecutorSort.RatingAsc,
                label: "Рейтинг по убыванию",
              },
              {
                value: ExecutorSort.RatingDesc,
                label: "Рейтинг по возврастанию",
              },
            ]}
            renderToggleButton={(s, h) => (
              <Button
                variant={"text"}
                color={s.activeColor}
                onClick={h}
                key={s.value}
                className="space-x-1 whitespace-nowrap"
              >
                <span>{s.label ?? s.value}</span>
              </Button>
            )}
            onChangeValue={(v) => setSortType(v as any)}
          />
        </ScrollContainer>
      </Paper>

      <ExecutorsList
        executors={(data?.executors?.edges?.map((e) => e.node) as User[]) ?? []}
      />

      {loading && <LinearLoading className="w-full" />}

      {data?.executors?.pageInfo.hasNextPage && (
        <div className="mx-auto">
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.executors?.pageInfo.endCursor,
                  order: order,
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

export default ExecutorsPage;
