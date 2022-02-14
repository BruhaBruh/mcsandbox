import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import toast from "react-hot-toast";
import Button from "../components/button";
import ChatCard from "../components/chat";
import LinearLoading from "../components/loading/linear";
import Paper from "../components/paper";
import { Orderchat, useChatsQuery } from "../generated/graphql";

const ChatsPage: NextPage = () => {
  const { data, error, loading, fetchMore } = useChatsQuery({
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
        <title>Песочница › Чаты</title>
      </Head>
      {data?.orderchats?.edges ? (
        data.orderchats.edges
          .map((e) => e.node)
          .map((c) => <ChatCard chat={c as Orderchat} key={c.orderchatId} />)
      ) : (
        <Paper>
          <h1 className="text-xl text-center">Не найдено</h1>
        </Paper>
      )}

      {loading && <LinearLoading className="w-full" />}

      {data?.orderchats?.pageInfo.hasNextPage && (
        <div className="mx-auto">
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.orderchats?.pageInfo.endCursor,
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

export default ChatsPage;
