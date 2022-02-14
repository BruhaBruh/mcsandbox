import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import ChatForm from "../../components/chat/chatForm";
import ChatHeader from "../../components/chat/chatHeader";
import ChatMessages from "../../components/chat/chatMessages";

const ChatPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [repliedMessageId, setRepliedMessageId] = React.useState<number>();

  return (
    <div
      className="space-y-4 max-h-hero grid"
      style={{ gridTemplateRows: "max-content 1fr max-content" }}
    >
      <Head>
        <title>Песочница › Чат по заказу #{id}</title>
      </Head>
      <ChatHeader />
      {id && <ChatMessages id={Number(id)} setReply={setRepliedMessageId} />}
      <ChatForm
        reply={repliedMessageId}
        clearReply={() => setRepliedMessageId(undefined)}
      />
    </div>
  );
};

export default ChatPage;
