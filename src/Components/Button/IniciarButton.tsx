import { BaseButton } from "./BaseButton";
import React, { CSSProperties, FC } from "react";

interface IProps {
  onClick: () => void;
}

export const IniciarButton: FC<IProps> = ({ onClick }) => {
  return (
    <BaseButton onClick={onClick} style={container} text={"Iniciar sesión"} />
  );
};

const { container }: { [argName: string]: CSSProperties } = {
  container: {
    borderRadius: 6,
    backgroundColor: "#1bbc9b",
    width: "80%",
    textAlign: "center",
    padding: "10px 10px",
    color: "white",
    fontWeight: "bold",
    boxShadow: "0 1px 1px 0 #58902d",
    marginBottom: 36,
    marginTop: 36,
  },
};
