import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Product,
  ProductType,
  useEditProductMutation,
} from "../../generated/graphql";
import convertBase64 from "../../helpers/covertFileToBase64";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../lib/redux/ui/reducer";
import Avatar from "../avatar";
import Button from "../button";
import Modal from "../modal";
import ModalContent from "../modal/content";
import ModalHeader from "../modal/header";

type FormData = {
  name: string;
  description: string;
  image: string;
  type: ProductType;
  cost?: number;
  costEnd?: number;
  costStart?: number;
  costBy?: string;
};

const ProductEditForm: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [save, { data, loading, error }] = useEditProductMutation();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      name: product.name,
      description: product.description,
      image: product.image,
      type: product.type,
      cost: product.cost ?? undefined,
      costEnd: product.costEnd ?? undefined,
      costStart: product.costStart ?? undefined,
      costBy: product.costBy ?? undefined,
    },
  });
  const onSubmit = handleSubmit((data) => {
    if ((!data.cost && !data.costStart && !data.costEnd) || !data.image) return;
    save({
      variables: {
        id: product.productId,
        name: data.name,
        description: data.description,
        image: data.image,
        type: data.type,
        costBy: data.costBy,
        cost:
          costType === "one"
            ? Number(data.cost?.toString()) ?? undefined
            : undefined,
        costStart:
          costType === "multi"
            ? Number(data.costStart?.toString()) === 0
              ? undefined
              : Number(data.costStart?.toString()) ?? undefined
            : undefined,
        costEnd:
          costType === "multi"
            ? Number(data.costEnd?.toString()) === 0
              ? undefined
              : Number(data.costEnd?.toString()) ?? undefined
            : undefined,
      },
    });
  });
  const [imagePreview, setImagePreview] = React.useState(product.image);
  const [costType, setCostType] = React.useState<"one" | "multi">(
    product.cost ? "one" : "multi"
  );

  const handleImageLoad: React.ReactEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const file = ((e.target as HTMLInputElement).files as any)[0];
    const base64 = await convertBase64(file);
    setValue("image", base64?.toString() ?? "");
    setImagePreview(base64?.toString() ?? "");
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
    <Modal className="max-w-lg">
      <ModalHeader>Добавление товара</ModalHeader>
      <ModalContent>
        <form className="space-y-2" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Название</label>
            <input
              type="text"
              id="name"
              className="rounded-xl focus:border-sky-500"
              {...register("name", {
                required: true,
                minLength: 2,
                maxLength: 128,
              })}
            />
            {errors.name?.type === "required" && (
              <span className="text-sm text-red-500">Обязательно</span>
            )}
            {errors.name?.type === "minLength" && (
              <span className="text-sm text-red-500">
                Минимальная длина 2 символа
              </span>
            )}
            {errors.name?.type === "maxLength" && (
              <span className="text-sm text-red-500">
                Максимальная длина 128 символов
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              className="rounded-xl focus:border-sky-500"
              {...register("description", {
                required: true,
                minLength: 1,
                maxLength: 6000,
              })}
            />
            {errors.name?.type === "required" && (
              <span className="text-sm text-red-500">Обязательно</span>
            )}
            {errors.name?.type === "minLength" && (
              <span className="text-sm text-red-500">
                Минимальная длина 1 символ
              </span>
            )}
            {errors.name?.type === "maxLength" && (
              <span className="text-sm text-red-500">
                Максимальная длина 6000 символов
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="flex space-x-2 items-center justify-between"
            >
              <span>Изображение</span>
              <input
                accept="image/*"
                onChange={handleImageLoad}
                type="file"
                id="image"
                hidden
              />
              <Avatar src={imagePreview} size="large" variant="rounded" />
            </label>
            {imagePreview.length === 0 && (
              <span className="text-sm text-red-500">Обязательно</span>
            )}
          </div>

          <div className="flex flex-col">
            <label>Тип</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => setValue("type", ProductType.Product)}
                variant={
                  getValues().type === ProductType.Product ? "outlined" : "text"
                }
                size="medium"
                color="info"
              >
                Товар
              </Button>
              <Button
                onClick={() => setValue("type", ProductType.Service)}
                variant={
                  getValues().type === ProductType.Service ? "outlined" : "text"
                }
                size="medium"
                color="accent"
              >
                Услуга
              </Button>
            </div>

            {getValues().type !== ProductType.Product &&
              getValues().type !== ProductType.Service && (
                <span className="text-sm text-red-500">Обязательно</span>
              )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between space-x-2">
              <label>Цена</label>
              <div className="flex space-x-2">
                <Button
                  variant="text"
                  onClick={() => setCostType("one")}
                  color={costType === "one" ? "default" : "disabled"}
                >
                  Одна
                </Button>
                <Button
                  variant="text"
                  onClick={() => setCostType("multi")}
                  color={costType === "multi" ? "default" : "disabled"}
                >
                  Мульти
                </Button>
              </div>
            </div>
            {costType === "one" ? (
              <input
                type="number"
                placeholder="Цена"
                className="rounded-xl focus:border-sky-500"
                {...register("cost", { min: 1, max: 1000000 })}
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Стартовая цена"
                  className="rounded-xl focus:border-sky-500"
                  {...register("costStart", { min: 1, max: 1000000 })}
                />
                <input
                  type="number"
                  placeholder="Конечная цена"
                  className="rounded-xl focus:border-sky-500"
                  {...register("costEnd", { min: 1, max: 1000000 })}
                />
                <span>
                  {errors.costStart?.type === "min" && (
                    <span className="text-sm text-red-500">
                      Минимальное значение 1
                    </span>
                  )}
                  {errors.costStart?.type === "max" && (
                    <span className="text-sm text-red-500">
                      Максимальное значение 1.000.000
                    </span>
                  )}
                </span>
                <span>
                  {errors.costEnd?.type === "min" && (
                    <span className="text-sm text-red-500">
                      Минимальное значение 1
                    </span>
                  )}
                  {errors.costEnd?.type === "max" && (
                    <span className="text-sm text-red-500">
                      Максимальное значение 1.000.000
                    </span>
                  )}
                </span>
              </div>
            )}
            {errors.cost?.type === "min" && (
              <span className="text-sm text-red-500">
                Минимальное значение 1
              </span>
            )}
            {errors.cost?.type === "max" && (
              <span className="text-sm text-red-500">
                Максимальное значение 1.000.000
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="costBy">Цена в ...</label>
            <input
              type="text"
              id="costBy"
              className="rounded-xl focus:border-sky-500"
              {...register("costBy", { maxLength: 16 })}
            />
            {errors.costBy?.type === "maxLength" && (
              <span className="text-sm text-red-500">
                Максимальная длина 16 символов
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            size="medium"
            variant="outlined"
            color="success"
            disabled={loading}
          >
            Сохранить
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ProductEditForm;
