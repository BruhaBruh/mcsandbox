import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../lib/redux/ui/reducer";

export interface ModalProps {
  handleClose?: () => void;
  preventDispatch?: boolean;
}

const Modal: React.FC<ModalProps & React.HTMLAttributes<HTMLDivElement>> = ({
  handleClose,
  className,
  onClick,
  preventDispatch,
  ...props
}) => {
  const dispatch = useAppDispatch();

  const getComputedClassName = () => {
    return [className, "w-full p-4 bg-neutral-50 rounded-2xl"].join(" ");
  };

  const handleClickOnBackdrop = () => {
    if (handleClose) handleClose();
    if (preventDispatch) return;
    dispatch(setModal(null));
  };

  const handleClickOnModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  return (
    <div
      onMouseDown={handleClickOnBackdrop}
      className="z-50 fixed top-0 left-0 w-screen h-screen bg-neutral-900 bg-opacity-75 flex items-center justify-center p-2"
    >
      <div
        {...props}
        onMouseDown={handleClickOnModal}
        className={getComputedClassName()}
      />
    </div>
  );
};

export default Modal;
