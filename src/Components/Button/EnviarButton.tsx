import { BaseButton } from "./BaseButton";
import React, { CSSProperties, FC } from "react";

interface IProps {
  onClick: () => void;
  disabled: boolean;
}

export const EnviarButton: FC<IProps> = ({ onClick, disabled }) => {
  return (
    <BaseButton onClick={onClick} style={container(disabled)} text={"Enviar"} />
  );
};

const { container }: { container: (disabled: boolean) => CSSProperties } = {
  container: (disabled) => ({
    margin: "20px 30px",
    padding: "10px 10px",
    backgroundColor: !disabled ? "rgb(0,100,180)" : "rgba(0,0,0,0.4)",
    borderRadius: "4px",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "28px",
    cursor: !disabled ? "pointer" : "default",
  }),
};
