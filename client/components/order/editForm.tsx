import {
  Icon24ClockOutline,
  Icon28BombOutline,
  Icon28CancelCircleOutline,
  Icon28CheckCircleOutline,
  Icon28WorkOutline,
} from "@vkontakte/icons";
import dayjs from "dayjs";
import React, { ReactNode } from "react";
import Autocomplete from "react-autocomplete";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Order,
  OrderStatus,
  useEditOrderMutation,
  useExecutorsLazyQuery,
} from "../../generated/graphql";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../lib/redux/ui/reducer";
import Button from "../button";
import Modal from "../modal";
import ModalContent from "../modal/content";
import ModalHeader from "../modal/header";

type FormData = {
  executorId?: string;
  money?: number;
  status?: OrderStatus;
  expiredInDays?: number;
};

interface Status {
  value: OrderStatus;
  label: string;
  icon: ReactNode;
}

const statuses: Status[] = [
  {
    value: OrderStatus.IsConsidered,
    label: "Ожидание",
    icon: <Icon24ClockOutline className="text-sky-500 i-20" />,
  },
  {
    value: OrderStatus.InProgress,
    label: "Выполняется",
    icon: <Icon28WorkOutline className="text-neutral-400 i-20" />,
  },
  {
    value: OrderStatus.Success,
    label: "Выполнен",
    icon: <Icon28CheckCircleOutline className="text-green-500 i-20" />,
  },
  {
    value: OrderStatus.Rejected,
    label: "Отменен",
    icon: <Icon28CancelCircleOutline className="text-orange-500 i-20" />,
  },
  {
    value: OrderStatus.Expired,
    label: "Просрочен",
    icon: <Icon28BombOutline className="text-red-500 i-20" />,
  },
];

const OrderEditForm: React.FC<{ order: Order }> = ({ order }) => {
  const [search, setSearch] = React.useState("");
  const timer = React.useRef<any>();
  const [fetch, { data }] = useExecutorsLazyQuery();
  const [save, { data: saveData, loading, error }] = useEditOrderMutation();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<FormData>({
    reValidateMode: "onChange",
    defaultValues: {
      executorId: order.executorId ?? undefined,
      money: order.money ?? undefined,
      status: order.status,
    },
  });
  const onSubmit = handleSubmit((data) => {
    if (loading) return;
    save({
      variables: {
        id: order.orderId,
        input: {
          executorId: data.executorId ?? undefined,
          money: data.money ? Number(data.money.toString()) : undefined,
          expiredAtInDays: data.expiredInDays
            ? Number(data.expiredInDays.toString())
            : undefined,
          status: data.status,
        },
      },
    });
  });

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fetch({
        variables: {
          search: search,
        },
      });
    }, 500);
  }, [search, fetch]);

  React.useEffect(() => {
    if (!saveData) return;
    toast.success("Успешно!");
    dispatch(setModal(null));
  }, [saveData, dispatch]);

  React.useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  return (
    <Modal className="max-w-lg">
      <ModalHeader>Редактирование заказа #{order.orderId}</ModalHeader>
      <ModalContent>
        <form className="space-y-2" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label htmlFor="status">Статус</label>
            <Autocomplete
              getItemValue={(item) => item.value}
              items={statuses}
              renderItem={(item, isHighlighted) => (
                <div
                  className={
                    isHighlighted
                      ? "px-2 py-1 flex items-center space-x-2 hover:cursor-pointer bg-neutral-200"
                      : "px-2 py-1 flex items-center space-x-2 hover:cursor-pointer hover:bg-neutral-200"
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              )}
              value={getValues().status}
              onChange={(e) =>
                setValue("status", e.target.value as OrderStatus)
              }
              onSelect={(val) => setValue("status", val as OrderStatus)}
              wrapperProps={{ className: "relative" }}
              renderInput={(props) => (
                <input
                  {...props}
                  value={
                    statuses.filter((s) => s.value === props.value)[0]?.label ??
                    props.value
                  }
                  type="text"
                  className="rounded-xl focus:border-sky-500 w-full"
                />
              )}
              renderMenu={(items) => (
                <div className="z-50 absolute top-full translate-y-1 left-0 py-2 overflow-hidden rounded-xl bg-neutral-100 shadow-md border-sky-500 w-full divide-y-2">
                  {items}
                </div>
              )}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="executorId">Исполнитель</label>
            <Autocomplete
              getItemValue={(item) => item.value}
              items={
                data?.executors?.edges?.map((e) => ({
                  value: e.node.discordId,
                  label: e.node.nickname,
                  avatar: e.node.avatar,
                })) ?? []
              }
              renderItem={(item, isHighlighted) => (
                <div
                  className={
                    isHighlighted
                      ? "px-2 py-1 hover:cursor-pointer bg-neutral-200"
                      : "px-2 py-1 hover:cursor-pointer hover:bg-neutral-200"
                  }
                >
                  {item.label}
                </div>
              )}
              value={getValues().executorId}
              onSelect={(val) => setValue("executorId", val)}
              wrapperProps={{ className: "relative" }}
              renderInput={(props) => (
                <input
                  {...props}
                  onChange={(e) => {
                    if (props.onChange) props.onChange(e);
                    setSearch(e.currentTarget.value);
                  }}
                  value={
                    (
                      data?.executors?.edges?.map((e) => ({
                        value: e.node.discordId,
                        label: e.node.nickname,
                        avatar: e.node.avatar,
                      })) ?? []
                    ).filter((e) => e.value === props.value)[0]?.label
                      ? (
                          data?.executors?.edges?.map((e) => ({
                            value: e.node.discordId,
                            label: e.node.nickname,
                            avatar: e.node.avatar,
                          })) ?? []
                        ).filter((e) => e.value === props.value)[0].label
                      : search
                  }
                  type="text"
                  className="rounded-xl focus:border-sky-500 w-full"
                />
              )}
              renderMenu={(items) => (
                <div className="max-h-64 overflow-y-scroll hide-scrollbar z-50 absolute top-full translate-y-1 left-0 py-2 overflow-hidden rounded-xl bg-neutral-100 shadow-md border-sky-500 w-full divide-y-2">
                  {items.length ? (
                    items
                  ) : (
                    <div className="px-2 py-1">Не найдено</div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="money">Окончательная цена</label>
            <input
              type="number"
              id="money"
              className="rounded-xl focus:border-sky-500"
              {...register("money", { min: 1 })}
            />
            {errors.money?.type === "min" && (
              <span className="text-sm text-red-500">Минимальная цена 1</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="expiredInDays">Срок исполнения в днях</label>
            <input
              type="number"
              id="expiredInDays"
              className="rounded-xl focus:border-sky-500"
              {...register("expiredInDays", {
                min: 0,
              })}
            />
            {errors.expiredInDays?.type === "min" && (
              <span className="text-sm text-red-500">Минимально 0 дней</span>
            )}
            {getValues().expiredInDays && (
              <span>
                До{" "}
                {dayjs(
                  new Date(
                    new Date().getTime() +
                      1000 *
                        60 *
                        60 *
                        24 *
                        (getValues().expiredInDays as number)
                  )
                ).format("HH:mm DD.MM.YYYY")}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            size="medium"
            variant="outlined"
            color="success"
          >
            Сохранить
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default OrderEditForm;
