import React from "react";

const ModalHeader: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  return <h1 {...props} className={className + " text-2xl font-bold mb-2"} />;
};

export default ModalHeader;
