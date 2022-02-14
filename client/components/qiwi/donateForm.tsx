import React from "react";
import isEqual from "../../helpers/isEqual";
import Button from "../button";
import Modal from "../modal";
import ModalContent from "../modal/content";
import ModalHeader from "../modal/header";

interface Errors {
  min?: boolean;
  max?: boolean;
}

const DonateForm = () => {
  const [amount, setAmount] = React.useState(0);
  const [errors, setErrors] = React.useState<Errors>();

  React.useEffect(() => {
    const err: Errors = {};
    if (amount < 1 || amount > 50000) {
      err.min = amount < 1;
      err.max = amount > 50000;
    }
    setErrors(isEqual(err, {}) ? undefined : err);
  }, [amount, setErrors]);

  return (
    <Modal className="max-w-xs">
      <ModalHeader>Пополение баланса</ModalHeader>
      <ModalContent className="space-y-2">
        <div className="flex flex-col">
          <label htmlFor="money">Кол-во рублей</label>
          <input
            type="number"
            id="money"
            className="rounded-xl focus:border-sky-500"
            value={amount}
            onChange={(e) => setAmount(Number(e.currentTarget.value) ?? 0)}
          />
          {errors?.min && (
            <span className="text-sm text-red-500">Минимальное кол-во 1</span>
          )}
          {errors?.max && (
            <span className="text-sm text-red-500">
              Максимальное кол-во 50.000
            </span>
          )}
        </div>
        <Button
          className="w-full"
          size="medium"
          variant="outlined"
          color="success"
          href={"/api/qiwi/create?amount=" + amount}
          skipAlert
          target={"_self"}
          disabled={!!errors}
        >
          Пополнить
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default DonateForm;
