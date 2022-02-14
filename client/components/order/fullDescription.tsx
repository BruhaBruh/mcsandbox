import dayjs from "dayjs";
import React from "react";
import { Order, OrderStatus, ProductType } from "../../generated/graphql";
import { useAppDispatch } from "../../hooks/redux";
import Modal from "../modal";
import ModalContent from "../modal/content";
import ModalHeader from "../modal/header";

interface props {
  order: Order;
}

const OrderFullDescriptionModal: React.FC<props> = ({ order }) => {
  const dispatch = useAppDispatch();

  const showExpiredAt =
    order.status === OrderStatus.InProgress ||
    order.status === OrderStatus.Success ||
    order.status === OrderStatus.Expired;

  const getStatus = (): string => {
    switch (order.status) {
      case OrderStatus.IsConsidered:
        return "Ожидаение назначения исполнителя";
      case OrderStatus.InProgress:
        return "Выполняется исполнителем";
      case OrderStatus.Success:
        return "Выполнен";
      case OrderStatus.Rejected:
        return "Отменен";
      case OrderStatus.Expired:
        return "Просрочен";
    }
  };

  return (
    <Modal className="max-w-md">
      <ModalHeader>
        Заказ #{order.orderId} на {order.money} ₽
      </ModalHeader>
      <ModalContent className="flex flex-col space-y-1">
        <div>
          <h2 className="font-bold">
            {order.product.type === ProductType.Product ? "Товар" : "Услуга"}
          </h2>
          <h3 className="text-md text-neutral-800">{order.product.name}</h3>
        </div>
        <div>
          <h2 className="font-bold">Заказчик</h2>
          <h3 className="text-md text-neutral-800">{order.customer.tag}</h3>
        </div>
        {order.executor && (
          <div>
            <h2 className="font-bold">Исполнитель</h2>
            <h3 className="text-md text-neutral-800">
              {order.executor.nickname}
            </h3>
          </div>
        )}
        <div>
          <h2 className="font-bold">Статус</h2>
          <h3 className="text-md text-neutral-800">{getStatus()}</h3>
        </div>
        {showExpiredAt && (
          <div>
            <h2 className="font-bold">Должно быть готово</h2>
            <h3 className="text-md text-neutral-800">
              {dayjs(order.expiredAt).format("HH:mm DD.MM.YYYY")}
            </h3>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderFullDescriptionModal;
