import { BaseButton } from "./BaseButton";
import React, { CSSProperties, FC } from "react";

interface IProps {
  onClick: () => void;
}

export const RegistrarseButton: FC<IProps> = ({ onClick }) => {
  return (
    <BaseButton onClick={onClick} style={container} text={"Registrarse"} />
  );
};

const { container }: { [argName: string]: CSSProperties } = {
  container: {
    borderRadius: 6,
    backgroundColor: "#2c92db",
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
