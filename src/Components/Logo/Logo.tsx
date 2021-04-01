import React, { FC } from "react";
import logo from "../../imgs/logo.png";

export const Logo: FC = () => {
  return (
    <div style={container}>
      <img src={logo} style={logoStyle} alt="" />
    </div>
  );
};

const {
  container,
  logoStyle,
}: Record<"container" | "logoStyle", React.CSSProperties> = {
  container: {
    backgroundColor: "black",
    borderRadius: "100%",
    height: 50,
    width: 50,
    margin: "0px 35px",
    overflow: "hidden",
  },
  logoStyle: {
    height: 60,
    marginTop: 10,
    marginLeft: -5,
  },
};
