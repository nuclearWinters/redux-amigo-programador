import { BaseButton } from "./BaseButton";
import React, { CSSProperties, FC } from "react";

interface IProps {
  onClick: () => void;
}

export const EntregarTareaButton: FC<IProps> = ({ onClick }) => {
  return (
    <BaseButton onClick={onClick} style={container} text={"Ver ejercicio"} />
  );
};

const { container }: { container: CSSProperties } = {
  container: {
    margin: "20px 30px",
    padding: "10px 10px",
    backgroundColor: "rgb(0,100,180)",
    borderRadius: "4px",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "28px",
    cursor: "pointer",
  },
};
