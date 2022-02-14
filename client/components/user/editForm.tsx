import React from "react";
import Autocomplete from "react-autocomplete";
import toast from "react-hot-toast";
import { useEditUserMutation, User, UserStatus } from "../../generated/graphql";
import isNil from "../../helpers/isNil";
import userStatusToString from "../../helpers/userStatusToString";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../lib/redux/ui/reducer";
import Button from "../button";
import Modal from "../modal";
import ModalContent from "../modal/content";
import ModalHeader from "../modal/header";

interface Status {
  value: UserStatus;
}

const statuses: Status[] = [
  {
    value: UserStatus.Customer,
  },
  {
    value: UserStatus.Executor,
  },
  {
    value: UserStatus.Admin,
  },
];

const EditUserForm: React.FC<{ user: User | null | undefined }> = ({
  user,
}) => {
  const dispatch = useAppDispatch();
  const [save, { data, loading, error }] = useEditUserMutation();
  const [status, setStatus] = React.useState(user?.status);
  const [money, setMoney] = React.useState(user?.money);
  const [frozen, setFrozen] = React.useState(user?.frozenMoney);

  React.useEffect(() => {
    if (!data) return;
    toast.success("Успешно!");
    dispatch(setModal(null));
  }, [data, dispatch]);

  React.useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const ustatuses = [
      UserStatus.Customer,
      UserStatus.Admin,
      UserStatus.Executor,
      UserStatus.SuperAdmin,
    ];
    if (
      loading ||
      isNil(money) ||
      isNil(frozen) ||
      !ustatuses.includes(status as any)
    )
      return;
    save({
      variables: {
        id: user?.discordId ?? "0",
        status: status as UserStatus,
        money: money as number,
        frozen: frozen as number,
      },
    });
  };

  return (
    <Modal className="max-w-lg">
      <ModalHeader>Редактирование профиля {user?.nickname}</ModalHeader>
      <ModalContent>
        <form className="space-y-2" onSubmit={handleSubmit}>
          {status !== UserStatus.SuperAdmin && (
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
                    {userStatusToString(item.value)}
                  </div>
                )}
                value={status}
                onChange={(e) => setStatus(e.currentTarget.value as UserStatus)}
                onSelect={(val) => setStatus(val as UserStatus)}
                wrapperProps={{ className: "relative" }}
                renderInput={(props) => (
                  <input
                    {...props}
                    value={userStatusToString(props.value as UserStatus)}
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
          )}

          <div className="flex flex-col">
            <label htmlFor="money">Баланс</label>
            <input
              type="number"
              id="money"
              className="rounded-xl focus:border-sky-500"
              value={money}
              onChange={(e) =>
                setMoney(
                  e.currentTarget.value ? Number(e.currentTarget.value) : 0
                )
              }
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="freeze">Замороженный баланс</label>
            <input
              type="number"
              id="freeze"
              className="rounded-xl focus:border-sky-500"
              value={frozen}
              onChange={(e) =>
                setFrozen(
                  e.currentTarget.value ? Number(e.currentTarget.value) : 0
                )
              }
            />
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

export default EditUserForm;
