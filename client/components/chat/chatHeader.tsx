import { useRouter } from "next/router";
import React from "react";
import Paper from "../paper";

const ChatHeader: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Paper className="text-xl font-medium flex items-center">
      Чат заказа #{id}
    </Paper>
  );
};

export default ChatHeader;
