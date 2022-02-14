import React from "react";
import toast from "react-hot-toast";
import { Product, useRemoveProductMutation } from "../../generated/graphql";
import isNil from "../../helpers/isNil";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../lib/redux/ui/reducer";
import Alert from "../alert";
import Avatar from "../avatar";
import Button from "../button";
import ProductEditForm from "./editForm";

const AdminProductTableRow: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [remove, { data, error, loading }] = useRemoveProductMutation();
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

  React.useEffect(() => {
    if (!data) return;
    toast.success("Успешно!");
    dispatch(setModal(null));
  }, [data, dispatch]);

  React.useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{product.productId}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12">
            <Avatar src={product.image} size="large" variant="rounded" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{product.type}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{getCostString()}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button
          onClick={() =>
            dispatch(setModal(<ProductEditForm product={product} />))
          }
          variant="text"
          color="info"
        >
          Редактировать
        </Button>
        <Button
          onClick={() =>
            dispatch(
              setModal(
                <Alert
                  description={`Вы уверены, что хотите удалить товар с ID: ${product.productId}`}
                  acceptContent={"Удалить"}
                  onAccept={() =>
                    remove({ variables: { id: product.productId } })
                  }
                />
              )
            )
          }
          variant="text"
          color="error"
        >
          Удалить
        </Button>
      </td>
    </tr>
  );
};

export default AdminProductTableRow;
