import React, { ReactNode } from "react";
import { ButtonColor, ButtonProps } from "../button";

type Value = string | number | null | undefined;

export interface ToggleButtonState {
  value: Value;
  label?: string;
  icon?: ReactNode;
  activeColor?: ButtonColor;
}

interface ToggleButtonStateResult extends ToggleButtonState {
  isSelected: boolean;
}

export interface ToggleButtonsProps extends ButtonProps {
  values: ToggleButtonState[];
  defaultCurrentValue?: Value;
  onChangeValue?: (v: Value | Value[]) => void;
  multiple?: boolean;
  defaultColor?: ButtonColor;
  activeColor?: ButtonColor;
  renderToggleButton: (
    state: ToggleButtonStateResult,
    handler: () => void
  ) => ReactNode;
}

const ToggleButtonList: React.FC<ToggleButtonsProps> = ({
  values,
  onChangeValue,
  renderToggleButton,
  className,
  children,
  multiple,
  defaultCurrentValue,
  defaultColor,
  activeColor,
  ...props
}) => {
  const [value, setValue] = React.useState<Value>(defaultCurrentValue);
  const [multipleValues, setMultipleValues] = React.useState<Value[]>([
    defaultCurrentValue,
  ]);
  const initialRender = React.useRef(false);

  const getComputedClassName = () => {
    return [className, "flex space-x-2 items-center"].join(" ");
  };

  React.useEffect(() => {
    if (!initialRender.current) return;
    initialRender.current = false;
  }, [initialRender]);

  React.useEffect(() => {
    if (initialRender.current || !onChangeValue) return;
    onChangeValue(multiple ? multipleValues : value);
  }, [value, multipleValues, multiple, onChangeValue, initialRender.current]);

  const getFuncToSet = (v: Value): (() => void) => {
    if (multiple) {
      return () => {
        if (multipleValues.includes(v))
          setMultipleValues((prev) => prev.filter((va) => v !== va));
        else setMultipleValues((prev) => [...prev, v]);
      };
    } else {
      return () => {
        setValue(v);
      };
    }
  };

  const isSelected = (v: Value) => {
    return multiple ? multipleValues.includes(v) : v === value;
  };

  return (
    <div {...(props as any)} className={getComputedClassName()}>
      {values.map((v) =>
        renderToggleButton(
          {
            ...v,
            isSelected: isSelected(v.value),
            activeColor: isSelected(v.value)
              ? v.activeColor ?? activeColor
              : defaultColor,
          },
          getFuncToSet(v.value)
        )
      )}
    </div>
  );
};

ToggleButtonList.defaultProps = {
  defaultColor: "disabled",
  activeColor: "default",
};

export default ToggleButtonList;
