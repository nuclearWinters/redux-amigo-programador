import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const LupaIcono: FC = () => {
  return (
    <FontAwesomeIcon
      icon={faSearch}
      size="1x"
      color="rgba(0,0,0,0.6)"
      style={style}
    />
  );
};

const { style }: { [argsName: string]: React.CSSProperties } = {
  style: { alignSelf: "center", paddingRight: 10 },
};
