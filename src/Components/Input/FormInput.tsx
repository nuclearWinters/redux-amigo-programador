import React, { FC, useState, useCallback, CSSProperties } from "react";
import { BaseInput } from "./BaseInput";

interface IProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const FormInput: FC<IProps> = ({ value, onChange, placeholder }) => {
  const [focus, setFocus] = useState(false);
  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);
  return (
    <BaseInput
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      style={container(focus)}
      onChange={onChange}
    />
  );
};

const { container }: { container: (focus: boolean) => CSSProperties } = {
  container: (focus) => ({
    marginTop: 12,
    width: 240,
    padding: "10px 14px",
    color: "rgb(0,0,0)",
    borderColor: focus ? "#0791e6" : "rgba(0,0,0,0.2)",
    borderRadius: 4,
    borderWidth: 1,
    outline: "none",
    outlineOffset: 0,
    fontSize: 18,
  }),
};
