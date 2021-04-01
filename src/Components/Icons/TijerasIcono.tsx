import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCut } from "@fortawesome/free-solid-svg-icons";

export const TijerasIcono: FC = () => {
  return (
    <FontAwesomeIcon
      icon={faCut}
      size="1x"
      color="rgba(0,0,0,0.6)"
      style={style}
    />
  );
};

const { style }: { [argsName: string]: React.CSSProperties } = {
  style: { alignSelf: "center", paddingRight: 10 },
};
