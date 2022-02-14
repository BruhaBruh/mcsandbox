import React from "react";
import OrderCard from ".";
import { Order } from "../../generated/graphql";

interface props {
  orders: Order[];
}

const OrderList: React.FC<props> = ({ orders }) => {
  return (
    <div className="flex flex-col space-y-4">
      {orders?.map((o) => (
        <OrderCard order={o} key={o.orderId} />
      ))}
    </div>
  );
};

export default OrderList;
