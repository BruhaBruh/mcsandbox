import React from "react";
import ExecutorCard from ".";
import { User } from "../../generated/graphql";

interface props {
  executors: User[];
}

const ExecutorsList: React.FC<props> = ({ executors }) => {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr)" }}
    >
      {executors.map((e) => (
        <ExecutorCard executor={e} key={e.discordId} />
      ))}
    </div>
  );
};

export default ExecutorsList;
