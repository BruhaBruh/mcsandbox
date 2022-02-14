import { useRouter } from "next/router";
import React from "react";
import { Url } from "url";
import { useAppDispatch } from "../../hooks/redux";
import { setModal } from "../../lib/redux/ui/reducer";
import Alert from "../alert";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonVariant = "filled" | "outlined" | "text";
export type ButtonColor =
  | "accent"
  | "success"
  | "error"
  | "default"
  | "info"
  | "disabled";
export type LinkUnderline = "none" | "hover" | "always";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  href?: string;
  to?: string | Url;
  underline?: LinkUnderline;
  skipAlert?: boolean;
  icon?: boolean;
  inline?: boolean;
  target?: React.HTMLAttributeAnchorTarget;
}

const Button: React.FC<ButtonProps> = ({
  className,
  size,
  variant,
  color,
  href,
  to,
  underline,
  skipAlert,
  onClick,
  icon,
  inline,
  target,
  type,
  ...props
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const getPadding = () => {
    switch (size) {
      case "small":
        return icon ? "aspect-square" : "px-2";
      case "medium":
        return icon ? "aspect-square" : "px-3";
      case "large":
        return icon ? "aspect-square" : "px-5";
    }
  };

  const getDisplay = () => {
    return inline ? "inline-flex" : "flex";
  };

  const getSizeClassName = () => {
    switch (size) {
      case "small":
        return [
          getPadding(),
          getDisplay(),
          "flex items-center justify-center h-8 rounded-lg",
        ].join(" ");
      case "medium":
        return [
          getPadding(),
          getDisplay(),
          "flex items-center justify-center h-10 rounded-xl text-lg",
        ].join(" ");
      case "large":
        return [
          getPadding(),
          getDisplay(),
          "flex items-center justify-center h-12 rounded-2xl text-xl",
        ].join(" ");
    }
  };

  const getFilledColorClassName = () => {
    const disabledClassName =
      "transition-shadow disabled:shadow-neutral-300 disabled:bg-neutral-200 disabled:shadow-sm disabled:text-neutral-400 disabled:cursor-not-allowed";
    switch (color) {
      case "default":
        return (
          "bg-neutral-900 text-neutral-50 shadow-sm hover:shadow-md hover:shadow-neutral-300 shadow-neutral-300 active:shadow-none " +
          disabledClassName
        );
      case "accent":
        return (
          "bg-orange-500 text-neutral-900 shadow-sm hover:shadow-md hover:shadow-orange-300 shadow-orange-300 active:shadow-none " +
          disabledClassName
        );
      case "success":
        return (
          "bg-green-500 text-neutral-900 shadow-sm hover:shadow-md hover:shadow-green-300 shadow-green-300 active:shadow-none " +
          disabledClassName
        );
      case "error":
        return (
          "bg-red-500 text-neutral-900 shadow-sm hover:shadow-md hover:shadow-red-300 shadow-red-300 active:shadow-none " +
          disabledClassName
        );
      case "info":
        return (
          "bg-sky-500 text-neutral-900 shadow-sm hover:shadow-md hover:shadow-sky-300 shadow-sky-300 active:shadow-none " +
          disabledClassName
        );
      case "disabled":
        return (
          "bg-neutral-200 text-neutral-400 shadow-sm hover:shadow-md active:shadow-none " +
          disabledClassName
        );
    }
  };

  const getOutlinedColorClassName = () => {
    const disabledClassName =
      "transition disabled:cursor-not-allowed disabled:text-neutral-400 disabled:border-neutral-400 disabled:bg-opacity-0";
    switch (color) {
      case "default":
        return (
          "bg-transparent text-neutral-900 border border-neutral-900 hover:bg-neutral-900 hover:bg-opacity-10 active:bg-opacity-25 " +
          disabledClassName
        );
      case "accent":
        return (
          "bg-transparent text-orange-500 border border-orange-500 hover:bg-orange-500 hover:bg-opacity-10 active:bg-opacity-25 " +
          disabledClassName
        );
      case "success":
        return (
          "bg-transparent text-green-500 border border-green-500 hover:bg-green-500 hover:bg-opacity-10 active:bg-opacity-25 " +
          disabledClassName
        );
      case "error":
        return (
          "bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:bg-opacity-10 active:bg-opacity-25 " +
          disabledClassName
        );
      case "info":
        return (
          "bg-transparent text-sky-500 border border-sky-500 hover:bg-sky-500 hover:bg-opacity-10 active:bg-opacity-25 " +
          disabledClassName
        );
      case "disabled":
        return (
          "bg-transparent text-neutral-400 border border-neutral-400 hover:bg-neutral-400 hover:bg-opacity-10 active:bg-opacity-25 " +
          disabledClassName
        );
    }
  };

  const getUnderlineClassName = () => {
    switch (underline) {
      case "hover":
        return "hover:underline";
      case "always":
        return "underline";
      default:
        return "";
    }
  };

  const getTextColorClassName = () => {
    const disabledClassName =
      "transition disabled:cursor-not-allowed disabled:text-neutral-400";
    switch (color) {
      case "default":
        return (
          "bg-transparent text-neutral-900 hover:text-neutral-600 active:bg-opacity-20 active:bg-neutral-900 " +
          disabledClassName
        );
      case "accent":
        return (
          "bg-transparent text-orange-500 hover:text-orange-400 active:bg-opacity-20 active:bg-orange-500 " +
          disabledClassName
        );
      case "success":
        return (
          "bg-transparent text-green-500 hover:text-green-400 active:bg-opacity-20 active:bg-green-500 " +
          disabledClassName
        );
      case "error":
        return (
          "bg-transparent text-red-500 hover:text-red-400 active:bg-opacity-20 active:bg-red-500 " +
          disabledClassName
        );
      case "info":
        return (
          "bg-transparent text-sky-500 hover:text-sky-400 active:bg-opacity-20 active:bg-sky-500 " +
          disabledClassName
        );
      case "disabled":
        return (
          "bg-transparent text-neutral-400 hover:text-neutral-300 active:bg-opacity-20 active:bg-neutral-400 " +
          disabledClassName
        );
    }
  };

  const getColorWithVariantClassName = () => {
    switch (variant) {
      case "filled":
        return getFilledColorClassName();
      case "outlined":
        return getOutlinedColorClassName();
      case "text":
        return getTextColorClassName() + " " + getUnderlineClassName();
    }
  };

  const getComputedClassName = () => {
    return [
      "focus:outline-1 focus:outline-sky-500 focus:outline-offset-4 select-none",
      getSizeClassName(),
      getColorWithVariantClassName(),
      className ?? "",
    ].join(" ");
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) onClick(e);
    if (to) return router.push(to);
    if (href) {
      if (skipAlert) return window.open(href, target);
      dispatch(
        setModal(
          <Alert
            description={
              <>
                Вы перейдете на <span className="text-orange-500">{href}</span>.
              </>
            }
            onAccept={() => window.open(href, target)}
            onDecline={() => {}}
          />
        )
      );
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={getComputedClassName()}
      type={type ?? "button"}
    />
  );
};

Button.defaultProps = {
  size: "small",
  variant: "filled",
  color: "default",
  target: "_blank",
};

export default Button;
