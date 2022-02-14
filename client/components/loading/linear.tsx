import React from "react";

const LinearLoading: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={className + " animate-pulse bg-sky-200 w-full h-2 rounded"}
      {...props}
    />
  );
};

export default LinearLoading;
