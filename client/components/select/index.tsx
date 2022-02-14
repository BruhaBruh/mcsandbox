import React from "react";

const Select: React.FC<React.HTMLAttributes<HTMLSelectElement>> = ({
  ...props
}) => {
  return <select {...props} className={""} />;
};

export default Select;
