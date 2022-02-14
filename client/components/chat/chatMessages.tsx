import React from "react";
import toast from "react-hot-toast";
import ScrollContainer from "react-indiana-drag-scroll";
import {
  Ordermessage,
  useMessagesQuery,
  useUpdatedChatMessageSubscription,
} from "../../generated/graphql";
import Button from "../button";
import LinearLoading from "../loading/linear";
import Paper from "../paper";
import ChatMessage from "./chatMessage";

const ChatMessages: React.FC<{
  id: number;
  setReply: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = ({ id, setReply }) => {
  const { data, error, loading, fetchMore } = useMessagesQuery({
    variables: {
      id: id,
      after: null,
    },
  });
  const { data: updatedData } = useUpdatedChatMessageSubscription({
    variables: {
      id: id,
    },
  });
  const [messages, setMessages] = React.useState<Ordermessage[]>([]);

  React.useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  React.useEffect(() => {
    console.log(updatedData?.updatedMessage);
    setMessages((prev) => {
      const dataMsgs =
        (data?.ordermessages?.edges?.map((e) => e.node) as Ordermessage[]) ??
        [];
      const updatedMsg = updatedData?.updatedMessage;
      if (updatedMsg) {
        return [
          ...[
            ...prev,
            ...dataMsgs.filter(
              (m) =>
                !prev.map((p) => p.ordermessageId).includes(m.ordermessageId)
            ),
          ].filter((m) => m.ordermessageId !== updatedMsg?.ordermessageId),
          updatedMsg,
        ] as Ordermessage[];
      } else {
        return [
          ...prev,
          ...dataMsgs.filter(
            (m) => !prev.map((p) => p.ordermessageId).includes(m.ordermessageId)
          ),
        ] as Ordermessage[];
      }
    });
  }, [data, setMessages, updatedData]);

  return (
    <Paper
      withoutPadding
      className="p-2 grid"
      style={{ gridTemplateRows: "100%" }}
    >
      <ScrollContainer
        className="p-2 flex flex-col-reverse space-y-4 space-y-reverse hide-scrollbar"
        horizontal={false}
        hideScrollbars={false}
      >
        {!!messages.length &&
          messages
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((m, i, arr) => (
              <ChatMessage
                key={m.ordermessageId}
                chatMessage={m as Ordermessage}
                prevMessage={arr[i - 1] as Ordermessage}
                nextMessage={arr[i + 1] as Ordermessage}
                setReply={setReply}
              />
            ))}

        {loading && <LinearLoading className="w-full" />}

        {data?.ordermessages?.pageInfo.hasNextPage && (
          <div className="mx-auto">
            <Button
              onClick={() =>
                fetchMore({
                  variables: {
                    after: data.ordermessages?.pageInfo.endCursor,
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
      </ScrollContainer>
    </Paper>
  );
};

export default ChatMessages;
