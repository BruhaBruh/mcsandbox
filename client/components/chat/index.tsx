import dayjs from "dayjs";
import React from "react";
import { Orderchat } from "../../generated/graphql";
import { useAppSelector } from "../../hooks/redux";
import Avatar from "../avatar";
import Paper from "../paper";

interface props {
  chat: Orderchat;
}

const ChatCard: React.FC<props> = ({ chat }) => {
  const discordId = useAppSelector((state) => state.user.discordId);

  return (
    <Paper className="flex space-x-2" to={"/chat/" + chat.orderchatId}>
      <div className="flex items-center relative">
        <Avatar
          src={chat.lastmessage?.owner.avatar as string}
          width={48}
          height={48}
          variant="rounded"
        />
      </div>
      <div className="flex-1" style={{ width: "1px" }}>
        <h1 className="text-lg font-medium truncate">
          «{chat.order.product.name}» #{chat.order.orderId} за{" "}
          {chat.order.money} ₽
        </h1>
        {chat.lastmessage ? (
          <h2 className="text-neutral-800 flex space-x-2 max-w-full">
            <span className="text-neutral-400">
              {chat.lastmessage?.owner.nickname}:{" "}
            </span>
            <span className="truncate flex-1">{chat.lastmessage?.message}</span>
            {chat.lastmessage?.readedUserIds?.includes(discordId as any) && (
              <div className="relative flex justify-center items-center">
                <div className="bg-sky-500 w-2 h-2 absolute rounded-full animate-ping" />
                <div className="bg-sky-500 w-2 h-2 rounded-full" />
              </div>
            )}
            <span className="text-neutral-400">
              {dayjs(chat.lastmessage?.createdAt).format("HH:mm")}
            </span>
          </h2>
        ) : (
          <h2 className="text-neutral-800 flex space-x-2 max-w-full">
            <span className="text-neutral-400">Нет сообщений</span>
          </h2>
        )}
      </div>
    </Paper>
  );
};

export default ChatCard;
