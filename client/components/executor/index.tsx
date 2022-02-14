import { Icon28StatisticsOutline } from "@vkontakte/icons";
import React from "react";
import { User } from "../../generated/graphql";
import Avatar from "../avatar";
import Paper from "../paper";

interface props {
  executor: User;
}

const ExecutorCard: React.FC<props> = ({ executor }) => {
  const getRatingColor = () => {
    return executor.rating < 100 ? "text-red-500" : "text-green-500";
  };

  return (
    <Paper
      className="space-x-2 flex items-center"
      to={executor.discordId ? "/u/" + executor.discordId : undefined}
    >
      <Avatar
        width={64}
        height={64}
        variant="rounded"
        size="large"
        src={executor.avatar}
      />
      <div className="flex flex-col w-full">
        <h1 className="text-lg font-medium">
          {executor.nickname?.length ? executor.nickname : executor.discordId}
        </h1>
        <div className="flex items-center space-x-2">
          <h2 className="">Рейтинг:</h2>
          <h2 className={getRatingColor() + " flex-1"}>{executor.rating}</h2>
          <Icon28StatisticsOutline className={getRatingColor()} />
        </div>
      </div>
    </Paper>
  );
};

export default ExecutorCard;
