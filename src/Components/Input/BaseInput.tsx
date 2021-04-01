import React, { FC, CSSProperties } from "react";

interface IProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  style: CSSProperties;
  onFocus: () => void;
  onBlur: () => void;
}

export const BaseInput: FC<IProps> = ({
  value,
  onChange,
  placeholder,
  style,
  onFocus,
  onBlur,
}) => {
  return (
    <input
      name={placeholder}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      style={style}
      onChange={onChange}
    />
  );
};
