import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../lib/redux/ui/reducer";
import Button from "../button";
import Modal from "../modal";
import ModalContent from "../modal/content";
import ModalHeader from "../modal/header";

const AuthAlert = () => {
  const dispatch = useAppDispatch();

  return (
    <Modal className="max-w-sm">
      <ModalHeader>Вы не авторизованы</ModalHeader>
      <ModalContent className="space-y-2 overflow-hidden text-lg">
        <h2 className="whitespace-pre-wrap">
          Для данного действия нужно быть авторизированным
        </h2>
        <div className="w-full flex items-center justify-end space-x-2">
          <Button
            onClick={() => {
              dispatch(setModal(null));
            }}
            variant="text"
          >
            Отмена
          </Button>
          <Button
            href="/api/auth/login"
            target={"_self"}
            skipAlert
            variant="outlined"
            color="accent"
          >
            Войти
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default AuthAlert;
