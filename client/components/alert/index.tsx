import React, { ReactNode } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../lib/redux/ui/reducer";
import Button from "../button";
import Modal from "../modal";
import ModalContent from "../modal/content";
import ModalHeader from "../modal/header";

interface props {
  description?: string | ReactNode;
  onAccept?: () => void;
  onDecline?: () => void;
  showAccept?: boolean;
  showDecline?: boolean;
  acceptContent?: string | ReactNode;
  declineContent?: string | ReactNode;
}

const Alert: React.FC<props> = ({
  description,
  acceptContent,
  declineContent,
  showAccept,
  showDecline,
  onAccept,
  onDecline,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Modal className="max-w-sm">
      <ModalHeader>Вы уверены?</ModalHeader>
      <ModalContent className="space-y-2 overflow-hidden text-lg">
        {description && <h2 className="whitespace-pre-wrap">{description}</h2>}
        <div className="w-full flex items-center justify-end space-x-2">
          {showDecline && (
            <Button
              onClick={() => {
                if (onDecline) onDecline();
                dispatch(setModal(null));
              }}
              variant="text"
            >
              {declineContent}
            </Button>
          )}
          {showAccept && (
            <Button
              onClick={() => {
                if (onAccept) onAccept();
                dispatch(setModal(null));
              }}
              variant="outlined"
              color="accent"
            >
              {acceptContent}
            </Button>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

Alert.defaultProps = {
  acceptContent: "Принять",
  declineContent: "Отмена",
  showAccept: true,
  showDecline: true,
};

export default Alert;
