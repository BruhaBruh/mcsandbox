import {
  Icon24CubeBoxOutline,
  Icon24InfoCircleOutline,
  Icon24ServicesOutline,
  Icon24ShoppingCartOutline,
} from "@vkontakte/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import Linkify from "react-linkify";
import {
  Product,
  ProductType,
  useCreateOrderMutation,
} from "../../generated/graphql";
import isNil from "../../helpers/isNil";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setModal } from "../../lib/redux/ui/reducer";
import Alert from "../alert";
import AuthAlert from "../alert/auth";
import Button from "../button";
import Modal, { ModalProps } from "../modal";
import ModalContent from "../modal/content";
import ModalHeader from "../modal/header";
import Paper, { PaperProps } from "../paper";

export interface ProductCardProps extends PaperProps {
  product: Product;
  modalProps?: ModalProps;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  modalProps,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const [createOrder, { data, error }] = useCreateOrderMutation();

  React.useEffect(() => {
    if (!data) return;
    router.push("/chat/" + data.createOrder.orderchatId);
  }, [data, router]);

  React.useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  const getIconByProductType = () => {
    switch (product.type) {
      case ProductType.Product:
        return <Icon24CubeBoxOutline className="text-sky-500 i-24" />;
      case ProductType.Service:
        return <Icon24ServicesOutline className="text-orange-500 i-24" />;
    }
  };

  const getBy = () => {
    return product.costBy ? ` / ${product.costBy}` : "";
  };

  const getCostString = () => {
    if (!isNil(product.cost)) return `${product.cost} ₽${getBy()}`;
    if (!isNil(product.costStart) && isNil(product.costEnd)) {
      return `от ${product.costStart} ₽${getBy()}`;
    } else if (isNil(product.costStart) && !isNil(product.costEnd)) {
      return `до ${product.costEnd} ₽${getBy()}`;
    } else if (!isNil(product.costStart) && !isNil(product.costEnd)) {
      return `${product.costStart}-${product.costEnd} ₽${getBy()}`;
    } else {
      return "Неверно указана цена";
    }
  };

  const openDescription = () => {
    dispatch(
      setModal(
        <Modal className="max-w-lg" {...modalProps}>
          <ModalHeader>Описание «{product.name}»</ModalHeader>
          <ModalContent className="whitespace-pre-wrap">
            <Linkify>{product.description}</Linkify>
          </ModalContent>
        </Modal>
      )
    );
  };

  const buy = () => {
    if (!isLoggedIn) return dispatch(setModal(<AuthAlert />));
    dispatch(
      setModal(
        <Alert
          description={
            "После назначения исполнителя у вас заморозится сумма товара."
          }
          // TODO: Сделать покупку
          onAccept={() => createOrder({ variables: { id: product.productId } })}
        />
      )
    );
  };

  return (
    <Paper
      withoutPadding
      className="grid"
      style={{
        gridTemplateRows: "max-content max-content",
        gridTemplateColumns: "100%",
      }}
      {...props}
    >
      <Image src={product.image} width={800} height={800} />
      <div className="p-4">
        <div className="flex items-center space-x-2">
          {getIconByProductType()}
          <h1 className="text-xl font-medium truncate overflow-hidden">
            {product.name}
          </h1>
        </div>
        <div className="flex items-center justify-between space-x-2">
          <h2 className="text-md">{getCostString()}</h2>
          <div className="flex items-center space-x-1">
            <Button
              data-tooltip="Купить"
              data-tooltip-left
              icon
              color="accent"
              variant="text"
              onClick={buy}
            >
              <Icon24ShoppingCartOutline className="i-24" />
            </Button>
            <Button
              data-tooltip="Описание"
              data-tooltip-left
              icon
              color="info"
              variant="text"
              onClick={openDescription}
            >
              <Icon24InfoCircleOutline className="i-24" />
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default ProductCard;
