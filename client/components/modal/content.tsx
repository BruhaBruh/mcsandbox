import React from "react";

const ModalContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div {...props} className={className ?? "text-lg"} />;
};

export default ModalContent;
