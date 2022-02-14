import React from "react";

const MasonryItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div {...props} className={"inline-block w-full p-2 " + className} />;
};

export default MasonryItem;
