import { useRouter } from "next/router";
import React from "react";
import { User } from "../../generated/graphql";
import userStatusToString from "../../helpers/userStatusToString";
import Avatar from "../avatar";

interface props {
  user: User;
}

const UserCard: React.FC<props> = ({ user }) => {
  const router = useRouter();

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          onClick={() => router.push("/u/" + user.discordId)}
          className="flex items-center cursor-pointer text-sky-500"
        >
          <div className="flex-shrink-0 h-10 w-10">
            <Avatar src={user.avatar} size="medium" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium">
              {user.nickname?.length
                ? user.nickname
                : user.tag?.length
                ? user.tag
                : user.discordId}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {userStatusToString(user.status)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{user.rating}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.money}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.frozenMoney}</td>
    </tr>
  );
};

export default UserCard;
