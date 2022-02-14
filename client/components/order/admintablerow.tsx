import {
  Icon24ClockOutline,
  Icon28BombOutline,
  Icon28CancelCircleOutline,
  Icon28CheckCircleOutline,
  Icon28WorkOutline,
} from "@vkontakte/icons";
import { useRouter } from "next/router";
import React from "react";
import { Order, OrderStatus } from "../../generated/graphql";
import isoTimeToPhrase from "../../helpers/isoTimeToPhrase";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../lib/redux/ui/reducer";
import Avatar from "../avatar";
import Button from "../button";
import OrderEditForm from "./editForm";

const AdminOrderTableRow: React.FC<{ order: Order }> = ({ order }) => {
  const dispatch = useAppDispatch();
  const getIconStatus = () => {
    switch (order.status) {
      case OrderStatus.IsConsidered:
        return <Icon24ClockOutline className="text-sky-500 i-24" />;
      case OrderStatus.InProgress:
        return <Icon28WorkOutline className="text-neutral-400 i-24" />;
      case OrderStatus.Success:
        return <Icon28CheckCircleOutline className="text-green-500 i-24" />;
      case OrderStatus.Rejected:
        return <Icon28CancelCircleOutline className="text-orange-500 i-24" />;
      case OrderStatus.Expired:
        return <Icon28BombOutline className="text-red-500 i-24" />;
    }
  };

  const router = useRouter();

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{order.orderId}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          onClick={() => router.push("/u/" + order.customer.discordId)}
          className="flex items-center space-x-2 cursor-pointer text-sky-500"
        >
          <div className="flex-shrink-0 h-12 w-12">
            <Avatar
              src={order.customer.avatar}
              size="large"
              variant="rounded"
            />
          </div>
          <div>
            {order.customer.tag?.length
              ? order.customer.tag
              : order.customer.discordId}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {order.executor ? (
          <div
            onClick={() => router.push("/u/" + order.executor?.discordId)}
            className="flex items-center space-x-2 cursor-pointer text-sky-500"
          >
            <div className="flex-shrink-0 h-12 w-12">
              <Avatar
                src={order.executor.avatar}
                size="large"
                variant="rounded"
              />
            </div>
            <div>
              {order.executor.nickname?.length
                ? order.executor.nickname
                : order.executor.tag?.length
                ? order.executor.tag
                : order.executor.discordId}
            </div>
          </div>
        ) : (
          <div className="w-full h-0.5 bg-gray-400 rounded" />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{order.product.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{order.money} ₽</td>
      <td className="px-6 py-4 whitespace-nowrap">{getIconStatus()}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {order.expiredAt ? (
          isoTimeToPhrase(order.expiredAt)
        ) : (
          <div className="w-full h-0.5 bg-gray-400 rounded" />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button
          to={"/chat/" + order.orderchat?.orderchatId}
          variant="text"
          color="info"
        >
          Чат
        </Button>
        <Button
          onClick={() => dispatch(setModal(<OrderEditForm order={order} />))}
          variant="text"
          color="info"
        >
          Редактировать
        </Button>
      </td>
    </tr>
  );
};

export default AdminOrderTableRow;
