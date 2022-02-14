import React from "react";

interface props {
  columns: number;
}

const Masonry: React.FC<props & React.HTMLAttributes<HTMLDivElement>> = ({
  columns,
  style,
  ...props
}) => {
  return (
    <div
      {...props}
      style={{
        ...style,
        columnGap: 0,
        columnCount: columns,
        columnFill: "balance-all",
      }}
    />
  );
};

export default Masonry;
