import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setDrawer } from "../../lib/redux/ui/reducer";

interface props {
  handleClose?: () => void;
}

const Drawer: React.FC<props & React.HTMLAttributes<HTMLDivElement>> = ({
  handleClose,
  className,
  onClick,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const timer = React.useRef<any>();

  const getComputedClassName = () => {
    return [
      "w-full max-w-7xl py-4 px-2 bg-neutral-50 rounded-t-2xl shadow-lg shadow-neutral-900",
      className,
    ].join(" ");
  };

  const handleClickOnBackdrop = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!!timer.current) return;
    if (handleClose) handleClose();
    (e.target as HTMLElement).animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(133%)" }],
      { duration: 200, iterations: 1 }
    );
    timer.current = setTimeout(() => {
      dispatch(setDrawer(null));
    }, 150);
  };

  const handleClickOnDrawer = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  return (
    <div
      onClick={handleClickOnBackdrop}
      className="z-40 animate-slideToTop fixed top-0 left-0 w-screen h-screen bg-neutral-900 bg-opacity-0 flex items-end justify-center p-2 pb-0"
    >
      <div
        {...props}
        onClick={handleClickOnDrawer}
        className={getComputedClassName()}
      />
    </div>
  );
};

export default Drawer;
