import Image, { ImageProps } from "next/image";
import React from "react";

type AvatarSize = "small" | "medium" | "large";
type AvatarType = "square" | "rounded" | "circle";

interface props {
  size?: AvatarSize;
  variant?: AvatarType;
}

const Avatar: React.FC<props & ImageProps> = ({
  size,
  variant,
  width,
  height,
  className,
  src,
  ...props
}) => {
  const getSize = (): string => {
    switch (size) {
      case "small":
        return "32px";
      case "medium":
        return "40px";
      case "large":
        return "48px";
      default:
        return "";
    }
  };

  const getVariantClassName = (): string => {
    switch (variant) {
      case "rounded":
        return "rounded-lg";
      case "circle":
        return "rounded-full";
      default:
        return "";
    }
  };

  const getClassName = () => {
    return [className, "bg-neutral-200", getVariantClassName()].join(" ");
  };

  return src ? (
    <Image
      {...props}
      src={src}
      width={width ?? getSize()}
      height={height ?? getSize()}
      className={getClassName()}
    />
  ) : (
    <div
      className={getClassName()}
      style={{
        width: width ?? getSize(),
        height: height ?? getSize(),
        minWidth: width ?? getSize(),
        minHeight: height ?? getSize(),
      }}
    />
  );
};

Avatar.defaultProps = {
  size: "small",
  variant: "circle",
  draggable: false,
};

export default Avatar;
