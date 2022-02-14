import {
  Icon24ClockOutline,
  Icon28BombOutline,
  Icon28CancelCircleOutline,
  Icon28ChatsOutline,
  Icon28CheckCircleOutline,
  Icon28WorkOutline,
} from "@vkontakte/icons";
import { useRouter } from "next/router";
import React from "react";
import { Order, OrderStatus } from "../../generated/graphql";
import isoTimeToPhrase from "../../helpers/isoTimeToPhrase";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../lib/redux/ui/reducer";
import Button from "../button";
import Paper from "../paper";
import OrderFullDescriptionModal from "./fullDescription";

interface props {
  order: Order;
}

const OrderCard: React.FC<props> = ({ order }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  const getStatusDescription = (): string | null => {
    switch (order.status) {
      case OrderStatus.IsConsidered:
        return "Ожидается назначение исполнителя";
      case OrderStatus.InProgress:
        return "Заказ выполняется исполнителем";
      case OrderStatus.Success:
        return "Заказ выполнен";
      case OrderStatus.Rejected:
        return "Заказ отменен";
      case OrderStatus.Expired:
        return "Заказ просрочен";
      default:
        return null;
    }
  };

  const getComputedClassName = () => {
    return [
      "space-x-2 flex items-center justify-between overflow-visible cursor-pointer",
    ].join(" ");
  };

  return (
    <Paper
      data-tooltip="Нажми, для подробной информации"
      data-tooltip-top
      className={getComputedClassName()}
      onClick={() =>
        dispatch(setModal(<OrderFullDescriptionModal order={order} />))
      }
    >
      <div className="flex-1">
        <h1 className="text-lg font-medium">
          «{order.product.name}» #{order.orderId} за {order.money} ₽
        </h1>
        <h2>{getStatusDescription()}</h2>
        {order.expiredAt && order.status !== OrderStatus.Rejected && (
          <h3 className="text-sm text-neutral-400">
            {isoTimeToPhrase(order.expiredAt)}
          </h3>
        )}
      </div>
      <div className="flex flex-col space-y-1 items-center justify-between">
        {order.status !== OrderStatus.Rejected && (
          <Button
            icon
            className="after:w-max"
            color="info"
            variant="text"
            data-tooltip="Перейти в чат"
            data-tooltip-left
            onClick={(e) => {
              e.stopPropagation();
              router.push("/chat/" + order.orderchat?.orderchatId);
            }}
          >
            <Icon28ChatsOutline className="i-24" />
          </Button>
        )}
        {getIconStatus()}
      </div>
    </Paper>
  );
};

export default OrderCard;
